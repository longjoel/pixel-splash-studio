extends PopupMenu

@export var tool_manager_path: NodePath

var _tool_manager: Tools
var _id_to_tool: Dictionary = {}

func _ready() -> void:
	if tool_manager_path.is_empty():
		push_warning("ToolMenu -> Missing tool manager path")
		return
	_tool_manager = get_node_or_null(tool_manager_path)
	if _tool_manager == null:
		push_warning("ToolMenu -> Tool manager not found at %s" % tool_manager_path)
		return
	id_pressed.connect(_on_item_pressed)
	_tool_manager.tool_changed.connect(_on_tool_changed)
	_build_menu()

func _build_menu() -> void:
	clear()
	_id_to_tool.clear()
	if _tool_manager == null:
		return
	var tools := _tool_manager.get_tools()
	var ordered := tools.keys()
	ordered.sort()
	var next_id := 0
	for tool in ordered:
		var data: Dictionary = tools[tool]
		var label :Variant= data.get("label", str(tool))
		add_radio_check_item(label, next_id)
		set_item_metadata(next_id, tool)
		var icon: Texture2D = data.get("icon")
		if icon:
			set_item_icon(next_id, icon)
		_id_to_tool[next_id] = tool
		if tool == _tool_manager.get_active_tool():
			set_item_checked(next_id, true)
		next_id += 1

func _on_item_pressed(id: int) -> void:
	if !_id_to_tool.has(id):
		return
	var tool: Enums.ToolEnum = _id_to_tool[id]
	_tool_manager.set_tool(tool)

func _on_tool_changed(tool: Enums.ToolEnum) -> void:
	for id in _id_to_tool.keys():
		set_item_checked(id, _id_to_tool[id] == tool)
