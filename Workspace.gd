extends Node2D


	
# PixelScale is how big a pixel should be rendered. This can be considered the zoom level
# larger PixelScale = bigger pixel, or zooming in
@export var PixelScale:=32.0

# Background color of the canvas
@export var BackgroundColor:=Color.WHEAT

# Pixel grid color (the boundary between pixels)
@export var PixelGridColor :=Color.LIGHT_BLUE

# Tile grid color (the boundary between 8x8 tiles)
@export var TileGridColor :=Color.DIM_GRAY
const TILE_SIZE := 8

# Camera position (world-space pixels, stored as floats to preserve sub-pixel panning)
@export var Camera:=Vector2.ZERO

# Cursor position
@export var Cursor:=Vector2i(1,1)

# Active tool
@export var Tool:= Enums.ToolEnum.Grab
@export var tool_manager_path: NodePath
var tool_manager: Tools

# Palette
@export var Palette:Array[Color] = [
	Color.TRANSPARENT,
	Color.BLACK,
	Color.WHITE,
	Color.RED,
	Color.GREEN,
	Color.BLUE,
	Color.YELLOW,
	Color.MAGENTA,
	Color.CYAN
]

# we are using an indexed palette primary and secondary
@export var PrimaryPaletteIndex:=1
@export var SecondaryPaletteIndex:=0


# keep track of the absolute position placement over the canvas of the mouse positions
# while it's activated or not activated
var toolDownMousePositions :=[Vector2(0,0)]

# tool is activated?
var toolIsActivated:=false	
var _temporary_grab_tool: Enums.ToolEnum = Enums.ToolEnum.Grab
var _using_temporary_grab := false
var _temporary_zoom_tool: Enums.ToolEnum = Enums.ToolEnum.Zoom

# each tile is going to have an offset paired to an 8x8 array of tile data.
var tiles: Dictionary[Vector2i, PackedByteArray]

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	_setup_tool_manager()
	_center_cursor_on_viewport()

# Draw all the pixels on the screen, the grid, if visible.
func _draw() -> void:
	var view_rect := Rect2(Vector2.ZERO, get_viewport_rect().size)
	_draw_background(view_rect)
	_draw_axes(view_rect)
	_draw_tile_grid(view_rect)
	_draw_pixel_grid(view_rect)
	_draw_cursor()

func _draw_background(view_rect: Rect2) -> void:
	draw_rect(view_rect, BackgroundColor, true)

func _draw_pixel_grid(view_rect: Rect2) -> void:
	var pixel_scale :float= max(1.0, float(PixelScale))
	if pixel_scale < 16.0:
		return
	var scaled_width := int(ceil(view_rect.size.x / pixel_scale)) + 2
	var scaled_height := int(ceil(view_rect.size.y / pixel_scale)) + 2
	var start_column := int(floor(Camera.x))
	var start_row := int(floor(Camera.y))

	for column in range(start_column, start_column + scaled_width):
		var screen_x := (column - Camera.x) * pixel_scale
		var start := Vector2(screen_x, view_rect.position.y)
		var end := Vector2(screen_x, view_rect.position.y + view_rect.size.y)
		draw_line(start, end, PixelGridColor)

	for row in range(start_row, start_row + scaled_height):
		var screen_y := (row - Camera.y) * pixel_scale
		var start := Vector2(view_rect.position.x, screen_y)
		var end := Vector2(view_rect.position.x + view_rect.size.x, screen_y)
		draw_line(start, end, PixelGridColor)

func _draw_tile_grid(view_rect: Rect2) -> void:
	var pixel_scale :float= max(1.0, float(PixelScale))
	if pixel_scale < 8.0:
		return
	var tile_width := int(ceil(view_rect.size.x / (pixel_scale * TILE_SIZE))) + 2
	var tile_height := int(ceil(view_rect.size.y / (pixel_scale * TILE_SIZE))) + 2
	var start_tile_column := int(floor(Camera.x / TILE_SIZE))
	var start_tile_row := int(floor(Camera.y / TILE_SIZE))

	for column in range(start_tile_column, start_tile_column + tile_width):
		var world_x := column * TILE_SIZE
		var screen_x := (world_x - Camera.x) * pixel_scale
		var start := Vector2(screen_x, view_rect.position.y)
		var end := Vector2(screen_x, view_rect.position.y + view_rect.size.y)
		draw_line(start, end, TileGridColor, 2.0)

	for row in range(start_tile_row, start_tile_row + tile_height):
		var world_y := row * TILE_SIZE
		var screen_y := (world_y - Camera.y) * pixel_scale
		var start := Vector2(view_rect.position.x, screen_y)
		var end := Vector2(view_rect.position.x + view_rect.size.x, screen_y)
		draw_line(start, end, TileGridColor, 2.0)

func _draw_axes(view_rect: Rect2) -> void:
	var pixel_scale :float= max(1.0, float(PixelScale))
	var origin_x := (-Camera.x) * pixel_scale
	var origin_y := (-Camera.y) * pixel_scale

	if origin_x >= view_rect.position.x and origin_x <= view_rect.position.x + view_rect.size.x:
		draw_line(Vector2(origin_x, view_rect.position.y), Vector2(origin_x, view_rect.position.y + view_rect.size.y), Color.DARK_RED, 3.0)

	if origin_y >= view_rect.position.y and origin_y <= view_rect.position.y + view_rect.size.y:
		draw_line(Vector2(view_rect.position.x, origin_y), Vector2(view_rect.position.x + view_rect.size.x, origin_y), Color.DARK_RED, 3.0)

func _draw_cursor() -> void:
	var pixel_scale :float= max(1.0, float(PixelScale))
	var screen_position := Vector2((Cursor.x - Camera.x) * pixel_scale, (Cursor.y - Camera.y) * pixel_scale)
	var rect := Rect2(screen_position, Vector2(pixel_scale, pixel_scale))
	var outline_width :float= clamp(pixel_scale * 0.1, 1.0, 3.0)
	draw_rect(rect, Color(0.4, 1.0, 0.4, 0.2), true)
	draw_rect(rect, Color(0.4, 1.0, 0.4, 0.8), false, outline_width)

func _setup_tool_manager() -> void:
	if tool_manager_path.is_empty():
		return
	tool_manager = get_node_or_null(tool_manager_path)
	if tool_manager == null:
		push_warning("Workspace -> Tool manager node not found at %s" % tool_manager_path)
		return
	tool_manager.set_workspace(self)
	Tool = tool_manager.get_active_tool()
	tool_manager.tool_changed.connect(_on_tool_changed)

func _on_tool_changed(tool: Enums.ToolEnum) -> void:
	Tool = tool

func _input(event: InputEvent) -> void:
	if _handle_shortcuts(event):
		get_viewport().set_input_as_handled()
		return
	if _is_mouse_over_ui(event):
		return
	if event is InputEventMouseButton and ((event as InputEventMouseButton).button_index == MOUSE_BUTTON_WHEEL_UP or (event as InputEventMouseButton).button_index == MOUSE_BUTTON_WHEEL_DOWN):
		_temp_switch_to_zoom(event as InputEventMouseButton)
		return
	#mouse down
	if event is InputEventMouseButton and event.is_pressed():
		if (event as InputEventMouseButton).button_index == MOUSE_BUTTON_MIDDLE:
			_temp_switch_to_grab()
		if tool_manager:
			tool_manager.on_begin(event)
		
	
	# mouse up
	if event is InputEventMouseButton and event.is_released():
		if (event as InputEventMouseButton).button_index == MOUSE_BUTTON_MIDDLE:
			_restore_previous_tool()
		if tool_manager:
			tool_manager.on_end(event)
		
			
	# mouse move
	if event is InputEventMouseMotion:
		_update_cursor_from_motion(event as InputEventMouseMotion)
		if tool_manager:
			tool_manager.on_move(event)
		pass

func _handle_shortcuts(event: InputEvent) -> bool:
	if tool_manager == null:
		return false
	if event is InputEventKey and event.is_pressed() and !(event as InputEventKey).echo:
		if event.is_action_pressed("tool_grab"):
			tool_manager.set_tool(Enums.ToolEnum.Grab)
			return true
	return false

func _is_mouse_over_ui(event: InputEvent) -> bool:
	var mouse_event := event as InputEventMouse
	if mouse_event == null:
		return false
	var ui_nodes := _get_ui_nodes()
	for node in ui_nodes:
		if node is Control and node.is_visible_in_tree():
			if node.get_global_rect().has_point(mouse_event.position):
				return true
	return false

func _get_ui_nodes() -> Array[Node]:
	var nodes: Array[Node] = []
	var control_root := get_node("/root/Control")
	if control_root == null:
		return nodes
	for child in control_root.get_children():
		if child == self:
			break
		nodes.append(child)
	return nodes

func _update_cursor_from_motion(event: InputEventMouseMotion) -> void:
	var canvas_position := _screen_to_canvas_position(event.position)
	var new_cursor := Vector2i(floor(canvas_position.x), floor(canvas_position.y))
	if new_cursor != Cursor:
		Cursor = new_cursor
		queue_redraw()

func _screen_to_canvas_position(screen_position: Vector2) -> Vector2:
	var inverse := get_global_transform_with_canvas().affine_inverse()
	var local_position := inverse * screen_position
	var pixel_scale :float= max(1.0, float(PixelScale))
	return Vector2(Camera) + local_position / pixel_scale

func _center_cursor_on_viewport() -> void:
	var center := get_viewport_rect().size * 0.5
	var canvas_position := _screen_to_canvas_position(center)
	Cursor = Vector2i(floor(canvas_position.x), floor(canvas_position.y))
	queue_redraw()

func _temp_switch_to_grab() -> void:
	if tool_manager and tool_manager.get_active_tool() != Enums.ToolEnum.Grab:
		_temporary_grab_tool = tool_manager.get_active_tool()
		_using_temporary_grab = true
		tool_manager.set_tool(Enums.ToolEnum.Grab)

func _restore_previous_tool() -> void:
	if _using_temporary_grab and tool_manager and tool_manager.get_active_tool() == Enums.ToolEnum.Grab:
		tool_manager.set_tool(_temporary_grab_tool)
		_using_temporary_grab = false

func _temp_switch_to_zoom(event: InputEventMouseButton) -> void:
	if tool_manager == null:
		return
	var previous_tool := tool_manager.get_active_tool()
	var cursor_before := Cursor
	var event_copy := InputEventMouseButton.new()
	event_copy.button_index = event.button_index
	event_copy.pressed = event.pressed
	event_copy.position = _cursor_to_screen_position()
	tool_manager.set_tool(Enums.ToolEnum.Zoom)
	tool_manager.on_begin(event_copy)
	Cursor = cursor_before
	tool_manager.set_tool(previous_tool)

func _cursor_to_screen_position() -> Vector2:
	var pixel_scale :float= max(1.0, float(PixelScale))
	var local := (Vector2(Cursor) - Vector2(Camera)) * pixel_scale
	return get_global_transform_with_canvas() * local
