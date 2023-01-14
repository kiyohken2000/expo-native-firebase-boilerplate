```
// ビルド:開発用バイナリ
eas build --profile development --platform ios
eas build --profile development --platform android

// ビルド:内部配布バイナリ
eas build --profile preview --platform ios
eas build --profile preview --platform android

// ビルド:プロダクション
eas build --profile production --platform ios
eas build --profile production --platform android

// OTAアップデート
expo publish --release-channel internal
expo publish --release-channel production

// iOS用:デバイス登録(開発用と内部配布バイナリのインストールに必須)
eas device:create
// 登録済みiPhoneの表示
eas device:list
```

iOSプロダクションビルド時はconfig.jsのreviewModeをtrueに

Android更新時は`android\app\build.gradle`のバージョン番号も書き換える