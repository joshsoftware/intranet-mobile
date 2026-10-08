const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');

const filesToPatch = [
  {
    filePath: path.join(projectRoot, 'node_modules/react-native-tab-view/src/Pager.ios.tsx'),
    search: 'PagerViewAdapter',
    replace: 'PanResponderAdapter',
  },
  {
    filePath: path.join(projectRoot, 'node_modules/react-native-tab-view/lib/module/Pager.ios.js'),
    search: 'PagerViewAdapter',
    replace: 'PanResponderAdapter',
  },
  {
    filePath: path.join(projectRoot, 'node_modules/react-native-tab-view/src/TabBar.tsx'),
    search: "const useNativeDriver = Platform.OS !== 'web';",
    replace: "const useNativeDriver = Platform.OS !== 'web' && Platform.OS !== 'ios';",
  },
  {
    filePath: path.join(projectRoot, 'node_modules/react-native-tab-view/lib/module/TabBar.js'),
    search: "const useNativeDriver = Platform.OS !== 'web';",
    replace: "const useNativeDriver = Platform.OS !== 'web' && Platform.OS !== 'ios';",
  },
  {
    filePath: path.join(projectRoot, 'node_modules/react-native-tab-view/src/TabBarIndicator.tsx'),
    search: "const useNativeDriver = Platform.OS !== 'web';",
    replace: "const useNativeDriver = Platform.OS !== 'web' && Platform.OS !== 'ios';",
  },
  {
    filePath: path.join(projectRoot, 'node_modules/react-native-tab-view/lib/module/TabBarIndicator.js'),
    search: "const useNativeDriver = Platform.OS !== 'web';",
    replace: "const useNativeDriver = Platform.OS !== 'web' && Platform.OS !== 'ios';",
  },
  // Permanent fix for React Native 0.85.1 C++ ABI mismatch with React-Core-prebuilt (23 undefined symbols)
  {
    filePath: path.join(projectRoot, 'node_modules/react-native/ReactCommon/react/renderer/debug/flags.h'),
    search: '#if defined(REACT_NATIVE_DEBUG) || defined(RN_ENABLE_DEBUG_STRING_CONVERTIBLE)',
    replace: '#if defined(RN_ENABLE_DEBUG_STRING_CONVERTIBLE) && RN_ENABLE_DEBUG_STRING_CONVERTIBLE',
  },
  {
    filePath: path.join(projectRoot, 'ios/Pods/Headers/Public/React-rendererdebug/react/renderer/debug/flags.h'),
    search: '#if defined(REACT_NATIVE_DEBUG) || defined(RN_ENABLE_DEBUG_STRING_CONVERTIBLE)',
    replace: '#if defined(RN_ENABLE_DEBUG_STRING_CONVERTIBLE) && RN_ENABLE_DEBUG_STRING_CONVERTIBLE',
  },
  {
    filePath: path.join(projectRoot, 'node_modules/react-native/ReactCommon/react/renderer/core/Sealable.h'),
    search: '#ifndef REACT_NATIVE_DEBUG',
    replace: '#if 1 // Fix Sealable ABI mismatch with React-Core-prebuilt',
  },
  {
    filePath: path.join(projectRoot, 'ios/Pods/Headers/Public/React-Fabric/react/renderer/core/Sealable.h'),
    search: '#ifndef REACT_NATIVE_DEBUG',
    replace: '#if 1 // Fix Sealable ABI mismatch with React-Core-prebuilt',
  },
];

filesToPatch.forEach(({ filePath, search, replace }) => {
  try {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      if (content.includes(search)) {
        content = content.replace(new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replace);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Successfully patched: ${path.basename(filePath)}`);
      } else {
        console.log(`Already patched or search string not found in: ${path.basename(filePath)}`);
      }
    } else {
      console.warn(`File not found: ${filePath}`);
    }
  } catch (e) {
    console.error(`Error patching ${filePath}:`, e);
  }
});
