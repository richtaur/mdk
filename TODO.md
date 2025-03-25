# TODO

- complete all help commands
- get version from package.json
- `mdk image crop *.png --size 200x200 --position 50,50`
- `mdk image crop hello.gif -s 200x200 -p 50,50`
- `mdk video convert *.mp4 wav`
- `mdk video crop ...`
	- ffmpeg -s 640x480
- make video info
	- ffprobe -show_entries stream=width,height -i example.mp4
- use packaged ffmpeg
- make a video from images:
	- ffmpeg -framerate 30 -pattern_type glob -i '*.png' \
		-c:v libx264 -pix_fmt yuv420p out.mp4
- audit some commands having flipped format/target arguments
- add a license