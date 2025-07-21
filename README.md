### 📱 Contact Favourites App

تطبيق React Native لعرض جهات الاتصال، وإمكانية إضافة أي جهة إلى قائمة المفضلة مع رسالة مخصصة. يدعم حفظ البيانات بعد غلق التطبيق ويستخدم TypeScript و Redux Toolkit و Formik.

---

## 🚀 الميزات

- عرض قائمة جهات الاتصال من الهاتف.
- تحديد جهة اتصال كمفضلة برسالة شخصية.
- حفظ البيانات محليًا باستخدام `redux-persist`.
- التحقق من الجنس تلقائيًا باستخدام [Genderize API](https://genderize.io/).
- التحقق من صحة الرسائل باستخدام `Formik` و `Yup`.
- دعم تقصير الرسائل الطويلة مع خيار Show More.

---

## 🧱 البنية التقنية

- **React Native (TypeScript)**
- **Redux Toolkit + Persist**
- **Formik + Yup**
- **React Native Contacts**
- **Genderize API**

---

## 📦 التثبيت

```bash
# 1. إنشاء المشروع
npx react-native init ContactFavouritesApp --template react-native-template-typescript
cd ContactFavouritesApp

# 2. تثبيت الحزم الأساسية
npm install @reduxjs/toolkit react-redux redux-persist @react-native-async-storage/async-storage
npm install formik yup
npm install react-native-contacts

# 3. تثبيت pods (iOS)
npx pod-install
```

---

## ⚙️ إعداد الصلاحيات

### Android (`android/app/src/main/AndroidManifest.xml`)

```xml
<uses-permission android:name="android.permission.READ_CONTACTS" />
```

### iOS (`ios/ContactFavouritesApp/Info.plist`)

```xml
<key>NSContactsUsageDescription</key>
<string>We need access to your contacts to display them.</string>
```

---

## ▶️ التشغيل

```bash
# Android
npx react-native run-android

# iOS
npx react-native run-ios
```

---

## 📝 المتطلبات

- Node.js 16+
- React Native CLI
- Xcode (لـ macOS + iOS)
- Android Studio

---

## 📄 مثال على الطلب إلى Genderize API

```ts
const res = await fetch(`https://api.genderize.io/?name=John`);
const data = await res.json();
console.log(data.gender); // male / female / null
```

---

## 📚 ملفات المشروع

```
src/
├── components/          # مكونات الشاشة (ContactCard, Modal)
├── screens/             # HomeScreen الرئيسية
├── redux/               # Redux Slice
├── store/               # إعداد Store و Persist
├── types/               # (اختياري) أنواع مخصصة
```

---

## 🏁 جاهز للتجربة!

### ✅ الخطوات التي تم تنفيذها:

- [x] قراءة جهات الاتصال
- [x] تحديد جهة كمفضلة
- [x] إدخال رسالة مخصصة والتحقق منها
- [x] استخدام Formik للتحقق من الصحة
- [x] حفظ البيانات باستخدام Redux Persist
- [x] استخدام API خارجي للحصول على الجنس
