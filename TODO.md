# TODO

- use packaged ffmpeg
- use packaged mogrify
- clean up / polish help output
- add working examples with public domain assets included

## New Features

- image/video scale
	- make image scale 2 *.png
	- make image scale-pixels 2 *.png

- compress
	- add quality level?
	- only overwrite if savings found
	- mdk image compress: redo using convert

- mdk video info
	- ffprobe -show_entries stream=width,height -i example.mp4

- crop
	- mdk image crop
		- `mdk image crop *.png --size 200x200 --position 50,50`
		- `mdk image crop hello.gif -s 200x200 -p 50,50`
	- `mdk video crop ...` ffmpeg -s 640x480

- mdk video combine $output_file $path
	- make a video from images:
		- ffmpeg -framerate 30 -pattern_type glob -i '*.png' \
			-c:v libx264 -pix_fmt yuv420p out.mp4