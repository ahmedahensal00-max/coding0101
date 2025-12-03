# دليل نشر المشروع على Vercel 🚀

## المتطلبات الأساسية:
- ✅ حساب على [Vercel](https://vercel.com) (مجاني)
- ✅ حساب GitHub (المشروع موجود على GitHub)
- ✅ Gemini API Key من [Google AI Studio](https://aistudio.google.com/app/apikey)

---

## 📝 الخطوات التفصيلية:

### 1️⃣ **رفع الكود إلى GitHub**

إذا لم تكن رفعت التغييرات الأخيرة:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

---

### 2️⃣ **إنشاء حساب على Vercel**

1. اذهب إلى: https://vercel.com/signup
2. سجل الدخول باستخدام حساب GitHub
3. اسمح لـ Vercel بالوصول إلى repositories

---

### 3️⃣ **نشر المشروع**

#### الطريقة الأولى: من موقع Vercel

1. اذهب إلى: https://vercel.com/new
2. اختر repository المشروع: `coding0101`
3. اضغط **Import**
4. Vercel سيكتشف تلقائياً أنه مشروع Next.js

#### إعدادات المشروع:
- **Framework Preset**: Next.js (تلقائي)
- **Root Directory**: `./` (افتراضي)
- **Build Command**: `npm run build` (تلقائي)
- **Output Directory**: `.next` (تلقائي)

---

### 4️⃣ **إضافة Environment Variables**

قبل الضغط على **Deploy**، أضف المتغيرات التالية:

#### في قسم "Environment Variables":

| Key | Value | ملاحظات |
|-----|-------|---------|
| `GEMINI_API_KEY` | `AIzaSy...` | احصل عليه من [Google AI Studio](https://aistudio.google.com/app/apikey) |
| `JWT_SECRET` | `نص-عشوائي-طويل-وآمن` | أي نص عشوائي طويل (مثلاً: `my-super-secret-jwt-key-2024-coding0101`) |
| `OPENAI_API_KEY` | `sk-...` | (اختياري) إذا كنت تستخدم OpenAI |

**مهم جداً:** 
- ✅ اختر **Production, Preview, and Development** لكل متغير
- ⚠️ لا تشارك هذه المفاتيح مع أحد

---

### 5️⃣ **النشر**

1. بعد إضافة Environment Variables
2. اضغط **Deploy**
3. انتظر 2-3 دقائق حتى ينتهي البناء
4. ستحصل على رابط مثل: `https://coding0101.vercel.app`

---

## 🔧 الطريقة الثانية: باستخدام Vercel CLI

### تثبيت Vercel CLI:
```bash
npm install -g vercel
```

### تسجيل الدخول:
```bash
vercel login
```

### النشر:
```bash
vercel
```

اتبع التعليمات:
- Set up and deploy? **Y**
- Which scope? اختر حسابك
- Link to existing project? **N**
- Project name? `coding0101`
- In which directory? `./`
- Override settings? **N**

### إضافة Environment Variables عبر CLI:
```bash
vercel env add GEMINI_API_KEY
# أدخل القيمة عندما يُطلب منك
# اختر: Production, Preview, Development

vercel env add JWT_SECRET
# أدخل القيمة
```

### نشر للإنتاج:
```bash
vercel --prod
```

---

## ✅ التحقق من النشر

بعد النشر الناجح:

1. افتح الرابط الذي أعطاك إياه Vercel
2. جرب الموقع:
   - ✅ الصفحة الرئيسية تعمل
   - ✅ تبديل اللغة (عربي/إنجليزي)
   - ✅ صفحة المنتجات
   - ✅ السلة والدفع
   - ✅ ChatWidget (الدردشة مع AI)

---

## 🔄 التحديثات المستقبلية

كل ما تعمل `git push`، Vercel سينشر تلقائياً:

```bash
git add .
git commit -m "تحديث جديد"
git push origin main
```

Vercel سيكتشف التغييرات وينشر تلقائياً! 🎉

---

## 🐛 حل المشاكل الشائعة

### المشكلة: Build Failed
**الحل:**
```bash
# جرب البناء محلياً أولاً
npm run build

# إذا نجح، ارفع الكود
git push origin main
```

### المشكلة: API لا يعمل
**الحل:**
- تأكد من إضافة `GEMINI_API_KEY` في Environment Variables
- تحقق من أن المفتاح صحيح
- اذهب إلى: Vercel Dashboard → Project → Settings → Environment Variables

### المشكلة: 404 على بعض الصفحات
**الحل:**
- تأكد من أن جميع الملفات موجودة في `app/` directory
- تحقق من أن `next.config.ts` صحيح

---

## 📊 مراقبة المشروع

في Vercel Dashboard يمكنك:
- 📈 مشاهدة عدد الزيارات
- 🐛 مراجعة الأخطاء (Logs)
- ⚡ قياس الأداء (Analytics)
- 🌍 إضافة Domain مخصص

---

## 🎯 الخطوات التالية

بعد النشر الناجح:

1. ✅ احصل على Gemini API Key
2. ✅ أضفه في Vercel Environment Variables
3. ✅ جرب ChatWidget
4. ✅ شارك الرابط مع الآخرين!

---

## 📞 روابط مفيدة

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Google AI Studio](https://aistudio.google.com/app/apikey)
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

**ملاحظة:** المشروع مجاني 100% على Vercel للمشاريع الشخصية! 🎉
