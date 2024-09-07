# Simple Fasting Timer

## Overview

A React-based application to track fasting periods, set goals, and view fasting benefits.

## Features

- **Timer**: Tracks elapsed time.
- **Goal Setting**: Set fasting goals in hours.
- **Benefits List**: Shows fasting benefits at different intervals.

## Components

### App Component

Renders the `FastingTimer` component.

```jsx
import React from 'react';
import FastingTimer from './components/FastingTimer';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Fasting Timer</h1>
      <FastingTimer />
    </div>
  );
}

export default App;
