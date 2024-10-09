<template>
    <div class="aurora-container">
      <div class="aurora-blur aurora-blur-1"></div>
      <div class="aurora-blur aurora-blur-2"></div>
      <div class="aurora-blur aurora-blur-3"></div>
      <div class="aurora-blur aurora-blur-4"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Aurora'
  }
  </script>
  
  <style scoped>
  .aurora-container {
    position: fixed;
    inset: 0;
    z-index: -1;
    background-color: black;
    overflow: hidden;
  }
  
  .aurora-blur {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.5;
    mix-blend-mode: lighten;
  }
  
  .aurora-blur-1 {
    top: -50%;
    left: -50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0));
    animation: aurora-movement 25s linear infinite, aurora-pulse 15s ease-in-out infinite alternate;
  }
  
  .aurora-blur-2 {
    top: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0));
    animation: aurora-movement 30s linear infinite reverse, aurora-drift 20s ease-in-out infinite alternate;
  }
  
  .aurora-blur-3 {
    bottom: -50%;
    left: -50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0));
    animation: aurora-movement 35s linear infinite, aurora-pulse 18s ease-in-out infinite alternate-reverse;
  }
  
  .aurora-blur-4 {
    bottom: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at center, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0));
    animation: aurora-movement 40s linear infinite reverse, aurora-drift 22s ease-in-out infinite alternate-reverse;
  }
  
  @keyframes aurora-movement {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  @keyframes aurora-pulse {
    0%, 100% {
      transform: scale(1) rotate(0deg);
    }
    50% {
      transform: scale(1.1) rotate(180deg);
    }
  }
  
  @keyframes aurora-drift {
    0% {
      transform: translateX(0%) translateY(0%) rotate(0deg);
    }
    50% {
      transform: translateX(5%) translateY(-5%) rotate(180deg);
    }
    100% {
      transform: translateX(-5%) translateY(5%) rotate(360deg);
    }
  }
  </style>