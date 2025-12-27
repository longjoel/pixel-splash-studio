extends Node2D


	
# PixelScale is how big a pixel should be rendered. This can be considered the zoom level
# larger PixelScale = bigger pixel, or zooming in
@export var PixelScale:=32

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

# each tile is going to have an offset paired to an 8x8 array of tile data.
var tiles: Dictionary[Vector2i, PackedByteArray]

# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	_setup_tool_manager()

# Draw all the pixels on the screen, the grid, if visible.
func _draw() -> void:
	var view_rect := Rect2(Vector2.ZERO, get_viewport_rect().size)
	_draw_background(view_rect)
	_draw_tile_grid(view_rect)
	_draw_pixel_grid(view_rect)
	queue_redraw()

func _draw_background(view_rect: Rect2) -> void:
	draw_rect(view_rect, BackgroundColor, true)

func _draw_pixel_grid(view_rect: Rect2) -> void:
	var pixel_scale :float= max(1.0, float(PixelScale))
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
	#mouse down
	if event is InputEventMouseButton and event.is_pressed():
		if tool_manager:
			tool_manager.on_begin(event)
		
	
	# mouse up
	if event is InputEventMouseButton and event.is_released():
		if tool_manager:
			tool_manager.on_end(event)
		
			
	# mouse move
	if event is InputEventMouseMotion:
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
