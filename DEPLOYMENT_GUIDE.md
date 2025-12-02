# دليل نشر المشروع

## الطريقة 1: Vercel (موصى بها) 🌟

### الخطوات:

#### 1. رفع المشروع إلى GitHub
```bash
# إنشاء repository جديد على GitHub أولاً
# ثم في مجلد المشروع:

git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

#### 2. النشر على Vercel
1. اذهب إلى [vercel.com](https://vercel.com)
2. سجل دخول بحساب GitHub
3. اضغط "New Project"
4. اختر repository المشروع
5. أضف Environment Variables:
   - `GEMINI_API_KEY` = مفتاحك
6. اضغط "Deploy"

✅ **جاهز!** سيكون لديك رابط مثل: `your-project.vercel.app`

---

## الطريقة 2: Netlify

### الخطوات:
1. اذهب إلى [netlify.com](https://netlify.com)
2. سجل دخول بحساب GitHub
3. "Add new site" → "Import an existing project"
4. اختر repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
6. أضف Environment Variables
7. Deploy

---

## الطريقة 3: Railway

### الخطوات:
1. اذهب إلى [railway.app](https://railway.app)
2. "New Project" → "Deploy from GitHub repo"
3. اختر repository
4. أضف Environment Variables
5. Deploy

---

## الطريقة 4: استضافة خاصة (VPS)

### متطلبات:
- VPS (مثل DigitalOcean, AWS, etc.)
- Node.js 18+
- PM2 للإدارة

### الخطوات:
```bash
# على السيرفر:
git clone YOUR_REPO_URL
cd YOUR_PROJECT
npm install
npm run build

# إنشاء .env.local
echo "GEMINI_API_KEY=your_key" > .env.local

# تشغيل بـ PM2
npm install -g pm2
pm2 start npm --name "coding0101" -- start
pm2 save
pm2 startup
```

---

## ⚠️ ملاحظات مهمة:

### 1. ملف .env.local
**لا ترفعه إلى GitHub!** (محمي بـ .gitignore)
- أضف المتغيرات في لوحة تحكم المنصة

### 2. ملفات يجب التأكد منها:
- ✅ `.gitignore` يحتوي على:
  ```
  .env.local
  .env*.local
  node_modules
  .next
  ```

### 3. اختبار قبل النشر:
```bash
npm run build
npm start
```

---

## 🎯 التوصية النهائية:

**استخدم Vercel** لأنها:
1. مجانية 100%
2. أسهل طريقة
3. مخصصة لـ Next.js
4. نشر تلقائي عند كل push
5. SSL مجاني
6. أداء ممتاز

---

## 📝 بعد النشر:

1. اختبر الموقع
2. اختبر الشات بوت
3. تأكد من عمل جميع الصفحات
4. شارك الرابط! 🎉
