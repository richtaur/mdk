# TODO

- complete all help commands
	- audit for missing/incomplete commands
- audit the argument orders

- image -- support pixel-perfect resizing
	- ffmpeg -i input_file.png -s 64x64 -sws_flags neighbor output_file.png
	- maybe resize-pixels instead of flags
- `mdk image crop *.png --size 200x200 --position 50,50`
- `mdk image crop hello.gif -s 200x200 -p 50,50`
- `mdk video convert *.mp4 wav`
- `mdk video crop ...`
	- ffmpeg -s 640x480
- mdk video info
	- ffprobe -show_entries stream=width,height -i example.mp4
- make a video from images:
	- ffmpeg -framerate 30 -pattern_type glob -i '*.png' \
		-c:v libx264 -pix_fmt yuv420p out.mp4
- video: combine video files
	- make video combine
- use packaged ffmpeg
- get version from package.json