extends Node
class_name Tools

signal tool_changed(tool: Enums.ToolEnum)

const MIN_PIXEL_SCALE := 1
const MAX_PIXEL_SCALE := 256

var _tool: Enums.ToolEnum = Enums.ToolEnum.Grab
var _tools: Dictionary = {}
var _workspace: Node2D

var _grab_active := false

var _pen_active := false
var _pen_path: Array[Vector2] = []

var _shape_active := false
var _shape_anchor := Vector2.ZERO
var _shape_tool := Enums.ToolEnum.Grab
var _shape_preview: Array[Vector2] = []
var _clone_active := false

func _ready() -> void:
	_register_default_tools()

func set_workspace(workspace: Node2D) -> void:
	_workspace = workspace

func _register_default_tools() -> void:
	_tools = {
		Enums.ToolEnum.Grab: _create_tool("Grab", "Pan around the canvas"),
		Enums.ToolEnum.Zoom: _create_tool("Zoom", "Zoom in/out around the cursor"),
		Enums.ToolEnum.Pen: _create_tool("Pen", "Draw pixels with the primary color"),
		Enums.ToolEnum.Rectangle: _create_tool("Rectangle", "Draw rectangles (filled or outline)"),
		Enums.ToolEnum.Oval: _create_tool("Oval", "Draw ellipses within a bounding box"),
		Enums.ToolEnum.MagicWand: _create_tool("Magic Wand", "Select adjacent pixels of the same color"),
		Enums.ToolEnum.RectangleSelect: _create_tool("Rectangle Select", "Select pixels using a rectangular marquee"),
		Enums.ToolEnum.OvalSelect: _create_tool("Oval Select", "Select pixels using an ellipse marquee"),
		Enums.ToolEnum.CloneStamp: _create_tool("Clone Stamp", "Clone pixels from the selection buffer"),
		Enums.ToolEnum.ReferencePicker: _create_tool("Reference Picker", "Place/transform reference imagery")
	}

func _create_tool(
	label: String,
	description: String,
	icon: Texture2D = null
) -> Dictionary:
	return {
		"label": label,
		"description": description,
		"icon": icon
	}

func get_tools() -> Dictionary:
	var metadata: Dictionary = {}
	for tool in _tools.keys():
		metadata[tool] = {
			"label": _tools[tool]["label"],
			"description": _tools[tool]["description"],
			"icon": _tools[tool]["icon"]
		}
	return metadata

func get_tool_label(tool: Enums.ToolEnum) -> String:
	return _tools.get(tool, {}).get("label", "")

func set_tool(tool: Enums.ToolEnum) -> void:
	if _tool == tool:
		return
	_tool = tool
	tool_changed.emit(_tool)

func get_active_tool() -> Enums.ToolEnum:
	return _tool

func on_begin(event: InputEvent) -> void:
	match _tool:
		Enums.ToolEnum.Grab:
			_grab_begin(event)
		Enums.ToolEnum.Zoom:
			_zoom_begin(event)
		Enums.ToolEnum.Pen:
			_pen_begin(event)
		Enums.ToolEnum.Rectangle:
			_rectangle_begin(event)
		Enums.ToolEnum.Oval:
			_oval_begin(event)
		Enums.ToolEnum.MagicWand:
			_magic_wand_begin(event)
		Enums.ToolEnum.RectangleSelect:
			_rectangle_select_begin(event)
		Enums.ToolEnum.OvalSelect:
			_oval_select_begin(event)
		Enums.ToolEnum.CloneStamp:
			_clone_stamp_begin(event)
		Enums.ToolEnum.ReferencePicker:
			_reference_picker_begin(event)
		_:
			pass

func on_move(event: InputEvent) -> void:
	match _tool:
		Enums.ToolEnum.Grab:
			_grab_move(event)
		Enums.ToolEnum.Zoom:
			pass
		Enums.ToolEnum.Pen:
			_pen_move(event)
		Enums.ToolEnum.Rectangle:
			_rectangle_move(event)
		Enums.ToolEnum.Oval:
			_oval_move(event)
		Enums.ToolEnum.MagicWand:
			pass
		Enums.ToolEnum.RectangleSelect:
			_rectangle_select_move(event)
		Enums.ToolEnum.OvalSelect:
			_oval_select_move(event)
		Enums.ToolEnum.CloneStamp:
			_clone_stamp_move(event)
		Enums.ToolEnum.ReferencePicker:
			_reference_picker_move(event)
		_:
			pass

func on_end(event: InputEvent) -> void:
	match _tool:
		Enums.ToolEnum.Grab:
			_grab_end(event)
		Enums.ToolEnum.Zoom:
			pass
		Enums.ToolEnum.Pen:
			_pen_end(event)
		Enums.ToolEnum.Rectangle:
			_rectangle_end(event)
		Enums.ToolEnum.Oval:
			_oval_end(event)
		Enums.ToolEnum.MagicWand:
			pass
		Enums.ToolEnum.RectangleSelect:
			_rectangle_select_end(event)
		Enums.ToolEnum.OvalSelect:
			_oval_select_end(event)
		Enums.ToolEnum.CloneStamp:
			_clone_stamp_end(event)
		Enums.ToolEnum.ReferencePicker:
			_reference_picker_end(event)
		_:
			pass

# Grab tool -------------------------------------------------------
func _grab_begin(event: InputEvent) -> void:
	if !_is_grab_button(event):
		return
	_grab_active = true

func _grab_move(event: InputEvent) -> void:
	if !_grab_active or _workspace == null:
		return
	var motion := event as InputEventMouseMotion
	if motion == null:
		return
	var scale :float= max(1.0, float(_workspace.PixelScale))
	var delta :Vector2= motion.relative / scale
	_workspace.Camera -= delta

func _grab_end(event: InputEvent) -> void:
	if !_grab_active or !_is_grab_button(event):
		return
	_grab_active = false

# Zoom tool -------------------------------------------------------
func _zoom_begin(event: InputEvent) -> void:
	if _workspace == null or !(event is InputEventMouseButton):
		return
	var button := event as InputEventMouseButton
	var factor := 1.0
	match button.button_index:
		MOUSE_BUTTON_LEFT:
			factor = 1.25
		MOUSE_BUTTON_RIGHT:
			factor = 0.8
		MOUSE_BUTTON_WHEEL_UP:
			factor = 1.1
		MOUSE_BUTTON_WHEEL_DOWN:
			factor = 0.9
		_:
			return
	_apply_zoom(factor, button.position)

# Pen tool --------------------------------------------------------
func _pen_begin(event: InputEvent) -> void:
	if !_is_left_button(event) or _workspace == null:
		return
	var pos := _screen_to_canvas((event as InputEventMouseButton).position)
	_pen_active = true
	_pen_path.clear()
	_pen_path.append(pos)
	_workspace.toolIsActivated = true
	_workspace.Cursor = Vector2i(_floor_to_int(pos.x), _floor_to_int(pos.y))
	_workspace.toolDownMousePositions = _pen_path.duplicate()

func _pen_move(event: InputEvent) -> void:
	if !_pen_active or _workspace == null:
		return
	var motion := event as InputEventMouseMotion
	if motion == null:
		return
	var pos := _screen_to_canvas(motion.position)
	if _pen_path.size() == 0 or _pen_path[-1].distance_to(pos) >= 0.01:
		_pen_path.append(pos)
		_workspace.toolDownMousePositions = _pen_path.duplicate()
		_workspace.Cursor = Vector2i(_floor_to_int(pos.x), _floor_to_int(pos.y))

func _pen_end(event: InputEvent) -> void:
	if !_pen_active or !_is_left_button(event):
		return
	_pen_active = false
	if _workspace != null:
		_workspace.toolIsActivated = false

# Rectangle tool --------------------------------------------------
func _rectangle_begin(event: InputEvent) -> void:
	_begin_shape_tool(Enums.ToolEnum.Rectangle, event)

func _rectangle_move(event: InputEvent) -> void:
	_move_shape_tool(Enums.ToolEnum.Rectangle, event)

func _rectangle_end(event: InputEvent) -> void:
	_end_shape_tool(Enums.ToolEnum.Rectangle, event)

# Oval tool -------------------------------------------------------
func _oval_begin(event: InputEvent) -> void:
	_begin_shape_tool(Enums.ToolEnum.Oval, event)

func _oval_move(event: InputEvent) -> void:
	_move_shape_tool(Enums.ToolEnum.Oval, event)

func _oval_end(event: InputEvent) -> void:
	_end_shape_tool(Enums.ToolEnum.Oval, event)

# Magic wand ------------------------------------------------------
func _magic_wand_begin(event: InputEvent) -> void:
	if !_is_left_button(event) or _workspace == null:
		return
	var canvas_pos := _screen_to_canvas((event as InputEventMouseButton).position)
	_workspace.Cursor = Vector2i(_floor_to_int(canvas_pos.x), _floor_to_int(canvas_pos.y))
	_workspace.toolDownMousePositions = [canvas_pos]

# Rectangle select ------------------------------------------------
func _rectangle_select_begin(event: InputEvent) -> void:
	_begin_shape_tool(Enums.ToolEnum.RectangleSelect, event)

func _rectangle_select_move(event: InputEvent) -> void:
	_move_shape_tool(Enums.ToolEnum.RectangleSelect, event)

func _rectangle_select_end(event: InputEvent) -> void:
	_end_shape_tool(Enums.ToolEnum.RectangleSelect, event)

# Oval select -----------------------------------------------------
func _oval_select_begin(event: InputEvent) -> void:
	_begin_shape_tool(Enums.ToolEnum.OvalSelect, event)

func _oval_select_move(event: InputEvent) -> void:
	_move_shape_tool(Enums.ToolEnum.OvalSelect, event)

func _oval_select_end(event: InputEvent) -> void:
	_end_shape_tool(Enums.ToolEnum.OvalSelect, event)

# Clone stamp -----------------------------------------------------
func _clone_stamp_begin(event: InputEvent) -> void:
	if !_workspace or !_is_left_button(event):
		return
	var canvas_pos := _screen_to_canvas((event as InputEventMouseButton).position)
	_clone_active = true
	_shape_anchor = canvas_pos
	_workspace.toolIsActivated = true
	_workspace.toolDownMousePositions = [canvas_pos]

func _clone_stamp_move(event: InputEvent) -> void:
	if !_workspace or !_clone_active:
		return
	var motion := event as InputEventMouseMotion
	if motion == null:
		return
	var canvas_pos := _screen_to_canvas(motion.position)
	_workspace.toolDownMousePositions = [_shape_anchor, canvas_pos]

func _clone_stamp_end(event: InputEvent) -> void:
	if _workspace == null or !_clone_active or !_is_left_button(event):
		return
	_clone_active = false
	_workspace.toolIsActivated = false

# Reference picker ------------------------------------------------
func _reference_picker_begin(event: InputEvent) -> void:
	if !_workspace or !_is_left_button(event):
		return
	_workspace.toolIsActivated = true
	_grab_begin(event)

func _reference_picker_move(event: InputEvent) -> void:
	if !_workspace:
		return
	_grab_move(event)

func _reference_picker_end(event: InputEvent) -> void:
	if !_workspace:
		return
	_grab_end(event)
	_workspace.toolIsActivated = false

# Shared helpers --------------------------------------------------
func _begin_shape_tool(tool: Enums.ToolEnum, event: InputEvent) -> void:
	if !_workspace or !_is_left_button(event):
		return
	var canvas_pos := _screen_to_canvas((event as InputEventMouseButton).position)
	_shape_active = true
	_shape_tool = tool
	_shape_anchor = canvas_pos
	_shape_preview = [canvas_pos]
	_workspace.toolIsActivated = true
	_workspace.toolDownMousePositions = _shape_preview.duplicate()

func _move_shape_tool(tool: Enums.ToolEnum, event: InputEvent) -> void:
	if !_workspace or !_shape_active or _shape_tool != tool:
		return
	var motion := event as InputEventMouseMotion
	if motion == null:
		return
	var canvas_pos := _screen_to_canvas(motion.position)
	_shape_preview = [_shape_anchor, canvas_pos]
	_workspace.toolDownMousePositions = _shape_preview.duplicate()

func _end_shape_tool(tool: Enums.ToolEnum, event: InputEvent) -> void:
	if !_workspace or !_shape_active or _shape_tool != tool or !_is_left_button(event):
		return
	_shape_active = false
	_workspace.toolIsActivated = false

func _apply_zoom(factor: float, focus_position: Vector2) -> void:
	if _workspace == null:
		return
	var new_scale :float= clamp(int(round(_workspace.PixelScale * factor)), MIN_PIXEL_SCALE, MAX_PIXEL_SCALE)
	if new_scale == _workspace.PixelScale:
		return
	_workspace.PixelScale = new_scale
	var canvas_pos := _screen_to_canvas(focus_position)
	_workspace.Cursor = Vector2i(_floor_to_int(canvas_pos.x), _floor_to_int(canvas_pos.y))

func _is_left_button(event: InputEvent) -> bool:
	return event is InputEventMouseButton and (event as InputEventMouseButton).button_index == MOUSE_BUTTON_LEFT

func _is_grab_button(event: InputEvent) -> bool:
	if event is InputEventMouseButton:
		var button := (event as InputEventMouseButton).button_index
		return button == MOUSE_BUTTON_LEFT or button == MOUSE_BUTTON_MIDDLE
	return false

func _screen_to_canvas(screen_position: Vector2) -> Vector2:
	if _workspace == null:
		return screen_position
	var inverse := _workspace.get_global_transform_with_canvas().affine_inverse()
	var local_position := inverse * screen_position
	var scale :float= max(1.0, float(_workspace.PixelScale))
	return Vector2(_workspace.Camera) + local_position / scale

func _round_to_int(value: float) -> int:
	return int(round(value))

func _floor_to_int(value: float) -> int:
	return int(floor(value))
