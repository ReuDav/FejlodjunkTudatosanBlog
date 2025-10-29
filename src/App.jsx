import '@lynx-js/web-core';
import '@lynx-js/web-elements/all';
import './App.css';

export const App = () => {
  return (
    <page>
      <view style="flex:1;justify-content:center;align-items:center;background:#1e1e2f;">
        <view style="padding:20px;background:#2a2a3d;border-radius:16px;width:80%;max-width:480px;">
          <text style="font-size:28px;color:white;font-weight:bold;text-align:center;">
            Welcome to Lynx ⚡
          </text>
          <text style="color:#ccc;margin-top:8px;text-align:center;">
            A fast, cross-platform UI runtime built on modern web tech.
          </text>

          <image
            src="https://lynxjs.dev/logo.svg"
            style="width:120px;height:120px;margin:20px auto;display:block;"
            auto-size
          />

          <view style="margin-top:10px;padding:12px;background:#3b3b55;border-radius:10px;">
            <text style="color:#aaf;text-align:center;">
              Tap the Lynx logo and watch it react 🦊
            </text>
          </view>

          <text style="margin-top:20px;text-align:center;color:#999;font-size:12px;">
            Edit <text style="font-style:italic;">src/App.jsx</text> and save to reload.
          </text>
        </view>
      </view>
    </page>
  );
};
