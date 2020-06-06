# TODO

+ design the usage, e.g. `mdk audio something -something something`

## Images

- resize
	`mdk image resize *.png --size 200x200`
	`mdk image resize hello.gif -s 50%x50%`
- crop?
	`mdk image crop *.png --size 200x200 --position 50,50`
	`mdk image crop hello.gif -s 200x200 -p 50,50`

## Video

+ compression
	- `mdk video compress *.mov`
- convert video to gif
	- `mdk video convert-to-gif input.mp4 --output output.gif`
- resize / crop

## Audio Normalization

```
ffmpeg -i input.mp4 -af loudnorm=I=-23:LRA=7:tp=-2:print_format=json -f null -
ffmpeg -i input.mp4 -af loudnorm=I=-23:LRA=7:tp=-2:measured_I=-30:measured_LRA=1.1:measured_tp=-11:measured_thresh=-40.21:offset=-0.47 -ar 48k -y output.mp4
```

### Breakdown

`-i input.mp4` input file
`-af` audio filter
	`loudnorm=` set a loudnorm filter http://k.ylo.ph/2016/04/04/loudnorm.html
		`I=-23` integrated input (explanation/range TBD)
		`LRA=7` LRA = loudness range (explanation/range TBD)
		`tp=-2` true peak (explanation/range TBD)
		`print_format=json`
	`-f null` specifies no output file needed?
	`-` i think this is pipe to the next line?

`measured_I=-30` i think this manipulates the integrated input from the JSON
`measured_LRA=1.1` same
`measured_tp=-11` same
`04:measured_thresh=-40.21:offset=-0.47` the fuk is this
`-ar 48k -y output.mp4` TBD
