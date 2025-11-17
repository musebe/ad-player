# Building a Dynamic Ad Supported Video Playlist with Next.js and Cloudinary

Create a dynamic ad supported video playlist with Next.js and Cloudinary.
Play ads between your video content.
Monetize your media library.
Give your viewers a smooth TV like experience using React state and Cloudinary video delivery.

This project shows how to build a full ad driven player.
It uses three main videos and rotates between three ads.
You control when the ad plays and what link opens from the ad.
You can skip ads and jump between videos in the playlist.
The player supports dark and light mode.

## Features

* Three Cloudinary videos in a playlist
* Three rotating Cloudinary ads
* Play an ad at any time you choose
* Skip button for ads
* Ad click link opens in a new tab
* Apply new ad settings and restart playback
* Playlist selection
* React state controls the whole flow
* Dark and light mode with next themes
* Small components for easy edits
* Clear source links for debugging

## How it works

The player loads a video from Cloudinary.
At the time you set, the main video stops.
The ad video starts from the beginning.
When the ad ends, the main video returns to the right time.
When the main video ends, the next video starts.
The ads rotate in order.

This creates a simple version of mid roll ads used by many streaming apps.

## Project structure

```
components/
  video/
    AdPlayer.tsx
    AdPlayerHeader.tsx
    AdConfigPanel.tsx
    VideoPlaylist.tsx
    VideoSurface.tsx
    ControlsBar.tsx

lib/
  cloudinary.ts

app/
  layout.tsx
  page.tsx

public/
```

## Setup

### 1. Install packages

```bash
npm install
```

### 2. Add your Cloudinary values

Create `.env.local`:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name

# Main video ids
NEXT_PUBLIC_MAIN_1=videos/main/my-main-video
NEXT_PUBLIC_MAIN_2=videos/main/my-main-video2
NEXT_PUBLIC_MAIN_3=videos/main/my-main-video3

# Ad video ids
NEXT_PUBLIC_AD_1=videos/ads/my-ad
NEXT_PUBLIC_AD_2=videos/ads/my-ad2
NEXT_PUBLIC_AD_3=videos/ads/my-ad3
```

Your Cloudinary files should match this layout:

```
videos/
  main/
    my-main-video
    my-main-video2
    my-main-video3

  ads/
    my-ad
    my-ad2
    my-ad3
```

### 3. Run the project

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

You will see the player, playlist, and ad settings panel.

## Editing ad settings

You can control:

* When the ad plays
* The ad link that opens

Click **Apply settings** to restart the main video and use your changes.
Click **Play ad now** to test the ad.

## Playlist

The playlist shows the three main videos.
Click a video to load it.
Each item plays one ad per view.
The next video starts when the current one ends.

## Theme support

The app includes dark and light mode using next themes.
It matches the system theme.
You can add a toggle if you want quick switching.

## What you can extend

* Add more videos
* Add more ads
* Add pre roll ads
* Add post roll ads
* Add random ad selection
* Add a backend to track impressions
* Add custom Cloudinary transformations
* Add the official Cloudinary video player UI

The logic is simple and easy to build on.

## Why this project is useful

* Shows how to load Cloudinary videos in Next.js
* Shows how to control video playback with React
* Shows how to insert ads into video flow
* Shows how to manage a playlist
* Works without extra plugins
* Easy to adjust for any use case

## License

MIT.


