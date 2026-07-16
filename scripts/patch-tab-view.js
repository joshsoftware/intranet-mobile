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
  }
];

filesToPatch.forEach(({ filePath, search, replace }) => {
  try {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      if (content.includes(search)) {
        content = content.replace(new RegExp(search, 'g'), replace);
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
