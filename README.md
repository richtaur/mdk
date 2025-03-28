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
1. Open a terminal
1. In the `mdk` directory, run `yarn`
1. To make `mdk` globally available on your computer, run `yarn global add`
1. To upgrade `mdk`, run `yarn global upgrade`

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

[richtaur]: https://bsky.app/profile/richtaur.bsky.social
[htmavgaby]: https://www.valadria.com/how-to-make-a-video-game-all-by-yourself/
[valadria]: https://www.valadria.com/
[node]: https://nodejs.org/en
[yarn]: https://yarnpkg.com/