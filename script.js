// انتخاب المان‌های DOM
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const recordingVideo = document.getElementById('recording');

// متغیرهای مربوط به ضبط ویدیو
let mediaRecorder;
let recordedChunks = [];

// اضافه کردن گوش دهنده‌ها به دکمه‌ها
startBtn.addEventListener('click', startRecording);
stopBtn.addEventListener('click', stopRecording);

// تابع شروع ضبط
async function startRecording() {
    // گرفتن دسترسی به صفحه نمایش
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: { mediaSource: 'screen' } });

    // ایجاد نمونه از MediaRecorder
    mediaRecorder = new MediaRecorder(stream);

    // تعریف دو رویداد برای داده‌های ضبط شده و توقف ضبط
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.onstop = handleStop;

    // غیرفعال کردن دکمه شروع و فعال کردن دکمه توقف
    startBtn.disabled = true;
    stopBtn.disabled = false;

    // تهیه محفوظه برای ذخیره داده‌های ضبط شده
    recordedChunks = [];
    
    // شروع ضبط
    mediaRecorder.start();
}

// تابع بررسی داده‌ها
function handleDataAvailable(event) {
    if (event.data.size > 0) {
        recordedChunks.push(event.data);
    }
}

// تابع توقف ضبط
function handleStop() {
    // تبدیل محفوظه به فرمت ویدیو و نمایش آن
    const blob = new Blob(recordedChunks, { type: 'video/webm' });
    recordingVideo.src = URL.createObjectURL(blob);

    // فعال کردن دکمه شروع و غیرفعال کردن دکمه توقف
    startBtn.disabled = false;
    stopBtn.disabled = true;

    // تغییر عنوان صفحه برای نمایش به کاربر که ضبط متوقف شده است
    document.title = 'Recording Stopped';
}

// تابع توقف ضبط
function stopRecording() {
    mediaRecorder.stop();
}
