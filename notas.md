## Clase 329 Guardar Token en Async Storage

- https://react-native-async-storage.github.io/async-storage/docs/install/
- `yarn add @react-native-async-storage/async-storage`
- Guardo token `await AsyncStorage.setItem('token', resp.data.token);`

## Clase 344 Picker

`yarn add @react-native-picker/picker`

## Clase 356 Camara

- https://www.npmjs.com/package/react-native-image-picker
- `yarn add react-native-image-picker`
- `npx pod-install`
- Para iOS en `Info.plist` configurar `NSPhotoLibraryUsageDescription` y `NSCameraUsageDescription`

```
<key>NSPhotoLibraryUsageDescription</key>
	<string>Se requiere acceso a las fotografías</string>
	<key>NSCameraUsageDescription</key>
	<string>Se requiere acceso a la cámara para tomar fotografía de producto</string>
```

- `import {launchCamera, launchImageLibrary} from 'react-native-image-picker';`
