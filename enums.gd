extends Node

enum ToolEnum {Grab, # the panning tool
	Zoom, # the magnifiying glass
	Pen, # standard pixel drawing tool
	Rectangle, # draw a filled or outlined rectangle
	Oval, # draw an oval inside a reactangle
	MagicWand, # select adjacent pixels of the same color.
	RectangleSelect, # select pixels in a region.
	OvalSelect, # select pixels in a region bounded to an oval inside a rectangle
	CloneStamp, # take what's in the selection buffer and copy it back to the pixel buffer transformed.
	ReferencePicker # place a reference image behind the pixel buffer for tracing purposes. The reference picker tool allows you to position the reference image and other background vector objects.
}
