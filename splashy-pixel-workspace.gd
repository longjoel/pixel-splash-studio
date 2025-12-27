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

# Camera position
@export var Camera:=Vector2i(0,0)

# Cursor position
@export var Cursor:=Vector2i(1,1)

# Active tool
@export var Tool:= Enums.ToolEnum.Grab

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
	pass

# Draw all the pixels on the screen, the grid, if visible.
func _draw() -> void:
	
	queue_redraw()
	pass

func _input(event: InputEvent) -> void:
	
	
	#mouse down
	if event is InputEventMouseButton and event.is_pressed():
		if (event as InputEventMouseButton).button_index == MOUSE_BUTTON_LEFT:
			pass
		elif (event as InputEventMouseButton).button_index == MOUSE_BUTTON_RIGHT:
			pass
		elif (event as InputEventMouseButton).button_index == MOUSE_BUTTON_MIDDLE:
			pass
	
	# mouse up
	if event is InputEventMouseButton and event.is_released():
		if (event as InputEventMouseButton).button_index == MOUSE_BUTTON_LEFT:
			pass
		elif (event as InputEventMouseButton).button_index == MOUSE_BUTTON_RIGHT:
			pass
		elif (event as InputEventMouseButton).button_index == MOUSE_BUTTON_MIDDLE:
			pass
			
	# mouse move
	if event is InputEventMouseMotion:
		pass
