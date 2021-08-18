# Sketch note
This was a coding challenge done for https://bellish.co in November 2020. See the file tech-task-description.pdf for information about the challenge.


## Development set up
- install expo-cli `yarn global add expo-cli`
- install dependancies `yarn`
- start app `yarn start`
- open with the `expo` app on your phone, or using an emulator

---

## Interpretation of the problem
This task was a lot like a spike that we might encounter in a real project. We need to build a minimum functioning slice of an feature to investigate technical trade offs and the libraries available. I've treated this task like a spike, in that the main purpose is to gather information, and the code produced may be integrated into an existing application


## Main decision 1: "vanilla" react-native or a framework like expo
Pros of vanilla RN:

- more control over the app's behaviour, can be made faster, smoother, and smaller
- more packages available to us to build with (expo is restricted to JS only application code and 3rd party deps)

Pros of Expo:

- all application code is JS, easily for web devs (like me) to maintain, and code can be shared with a webapp
- gives us access to all of expo's tooling like their build systems and snack

Based on the above I'm leaning towards an Expo based app, but both are good options. This decision is also influenced by what drawing libraries are available to us, let's look at those before making a decision.


## Main decision 2: which drawing/sketching library to use
Given we only have 3 hours to get something functioning, writing the drawing code ourselves is out. Taking on a dependency that is quite core to our app is worth reasonable research, a poor library choice could waste a lot of our time in the near future.

After some quick research I found there are two architectural options, a native library that uses the OS's built in canvas, or a webview the uses and html canvas. I first looked at the native option as I expected the performance to be slicker.

Option 1: https://github.com/terrylinla/react-native-sketch-canvas

- uses a native code not a webview so likely to be more performant
- can't be used with expo, so may slow down dev time
- feature complete now, but seems to be abandoned (no commits in 2 years, good PRs sitting ignored by maintainers)
  - to use this library we'd have to be willing to take on maintenance of it

Option 2: use `react-native-webview` to wrap https://github.com/embiem/react-canvas-draw

- will take a little extra time to wrap in a webview
- outputs a really nice data format, that is a list of strokes, which are each a list of points, so we know the order they were drawn and each stoke can have it's own properties that can be modified later. None of these features are needed now but it gives us a lot of flexibility in future.
- unfortunately this library also looks abandoned, no commits and PRs sitting ignored for months

Option 3: https://github.com/YanYuanFE/react-native-signature-canvas

- this is an expo compatible webview wrapping the https://github.com/szimek/signature_pad library
- both libraries have recent commits and maintainers seem to be welcoming outside PRs
- because this library was made for signatures, it sets the stoke width based on drawing speed which gives sketches a natural look that I really like
- the `react-native-signature-canvas` library forces us to use html buttons which makes the app feel cheap this is acceptable for now but I'm only making this trade off because of time pressure
- once decided we were going to ship this app I would want to write our own webview wrapper around `signature_pad` so that we could get the styling just right
- as expected there is a noticeable delay while the webview loads, I would attempt to load it in the background so it appears to load instantly, if that wasn't technically possible then I would add a loading spinner so the app doesn't appear to "hang"

Option 3 is my preferred as it lets us move quickly, and leaves us lots of flexibility, it can work with or without expo and can work in a webapp. As this solution can work with expo I'll go with expo for the first decision, picking expo is an easily reversible decision so I'm not worried if I'm wrong.


## Decisions I didn't make
These are harder to reverse decisions that I intentionally didn't make yet. Not making these decisions now also doesn't cost me anything, so it's better to wait until I have more information.

- navigation:
  - `react-navigation` seems to be the standard for RN, I've used it a little before and it would be my first choice
- state management:
  - `redux` is my default, I've happily used it in many `react` projects and one `react-native` project
  - this app is so small we didn't need it, so I used react's `useReducer` to make a simple redux-like store that will be easy to migrate to redux or another state management solution when needed
- UI library/style management
  - I'm generally a fan of UI libraries, they can save _a lot_ of time, but this is a decision I need input from a designer on
  - I've used `styled-components` on the web and found they can make `react` code much cleaner, I would like to investigate how useful it would be in `react-native`


## What I would do next
- users should be name their sketch before saving, I started this on a branch called `name-sketch-on-save` but I ran out of time to finish it
- add an "empty state" message or animation to the sketch list so users don't feel lost
- there is a hacky `genUuid()` function that should be replaced
- the list of sketches should show a human friendly time stamp like "5 minutes ago"
- remove the html buttons "discard" and "save" and replace them with native buttons
- save sketch files to disk and/or cloud
- some of the above would require tests, so set up a testing framework for those
