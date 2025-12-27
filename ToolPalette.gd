extends HFlowContainer

@export var tool_manager_path: NodePath
var tool_manager: Tools

var _button_group := ButtonGroup.new()
var _buttons: Dictionary = {}

func _ready() -> void:
	if tool_manager_path.is_empty():
		push_warning("ToolPalette -> Missing tool manager path")
		return
	tool_manager = get_node_or_null(tool_manager_path)
	if tool_manager == null:
		push_warning("ToolPalette -> Cannot find node at %s" % tool_manager_path)
		return
	tool_manager.tool_changed.connect(_on_tool_changed)
	_build_tool_buttons()

func _build_tool_buttons() -> void:
	for child in get_children():
		child.queue_free()
	_buttons.clear()

	var definition := tool_manager.get_tools()
	var ordered_tools := definition.keys()
	ordered_tools.sort()

	for tool in ordered_tools:
		var button := _create_tool_button(tool, definition[tool])
		add_child(button)
		_buttons[tool] = button

func _create_tool_button(tool: Enums.ToolEnum, data: Dictionary) -> BaseButton:
	var button := Button.new()
	button.toggle_mode = true
	button.button_group = _button_group
	button.text = data.get("label", str(tool))
	button.tooltip_text = data.get("description", "")
	var icon: Texture2D = data.get("icon")
	if icon:
		button.icon = icon
		button.text = ""
		button.custom_minimum_size = Vector2(40, 40)
		button.expand_icon = true
		button.icon_alignment = HORIZONTAL_ALIGNMENT_CENTER
		button.vertical_icon_alignment = VERTICAL_ALIGNMENT_CENTER
	button.pressed.connect(_on_button_pressed.bind(tool, button))
	if tool == tool_manager.get_active_tool():
		button.button_pressed = true
	return button

func _on_button_pressed(tool: Enums.ToolEnum, button: Button) -> void:
	if !button.button_pressed:
		button.button_pressed = true
	tool_manager.set_tool(tool)

func _on_tool_changed(tool: Enums.ToolEnum) -> void:
	if _buttons.has(tool):
		var button := _buttons[tool] as Button
		if button.button_pressed:
			return
		button.button_pressed = true
