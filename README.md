# MDK (Matt's Development Kit)

Hi, I'm [Matt Hackett][richtaur], game developer (and [book author][htmavgaby]) at [Valadria][valadria], a small game studio.

This project houses (some of) the CLI tools I use to help me make (and promote) my video games.

_Note: This is a fairly messy personal project, but it's quite powerful!_

## Primary Purposes

Some of **mdk**'s many features:

* Batch image/video resizing
* Video compression
* Video conversion
* Audio normalizing
* GIF creation

## How to install

1. Install [Node][node]
1. Install [Yarn][yarn]
1. Install [FFmpeg][ffmpeg]
1. Open a terminal
1. In the `mdk` directory, run `yarn`
1. To make `mdk` globally available on your computer, run `yarn global add <path_to_mdk>`
	* e.g. `yarn global add ~/dev/personal/mdk`
1. To upgrade `mdk`, run `yarn global upgrade <path_to_mdk>`

## Windows installation notes

You may need to add **yarn**'s global bin to your PATH. To do that:

1. Open a terminal
1. Run `yarn global bin`
1. Copy the _output_ (something like `C:\Users\richt\AppData\Local\Yarn\bin`)
1. Add this value to your PATH:
1. In your control panel, open **Edit the system environment variables**
1. Press the **Environment Variables...** button
1. Select the **Path** variable
1. Press the **Edit...** button
1. Press the **New** button
1. Paste the _output_ of `yarn global bin`
1. Press the **OK** button

You should now be able to run `mdk` in any terminal.

## How to use

From a terminal, run `mdk` to show the help prompt. It should look something like this:

```
> Welcome to MDK v0.10.3
- Commands:
  mdk audio
  mdk image
  mdk video
> MDK exiting
```

## Audio commands

Run `mdk audio` to get a list of the audio commands.

### Compress audio file(s)

`mdk audio compress $path`

For example, to compress all mp3 files in a folder:

`mdk audio compress *.mp3`

### Convert audio file(s)

`mdk audio convert $format $path`

For example, to convert all wav files in a folder to mp3:

`mdk audio convert mp3 *.wav`

### Normalize audio file(s)

`mdk audio normalize $path`

For example, to [normalize][normalize] all mp3 files in a folder:

`mdk audio normalize *.mp3`

## Adjust the volume on audio file(s)

`mdk audio volume $volume $path`

For example, to halve the volume of all mp3 files in a folder:

`mdk audio volume 0.5 *.mp3`

Or to increase the volume of all wav files in a folder by 5dB:

`mdk audio volume 5dB *.wav`

See [FFmpeg's Audio Volume Manipulation][volume] page for more information.

[richtaur]: https://www.richtaur.com/
[htmavgaby]: https://www.valadria.com/how-to-make-a-video-game-all-by-yourself/
[valadria]: https://www.valadria.com/
[node]: https://nodejs.org/en
[yarn]: https://yarnpkg.com/
[normalize]: https://en.wikipedia.org/wiki/Audio_normalization
[volume]: https://trac.ffmpeg.org/wiki/AudioVolume