// ==================== WARNING OVERLAY ====================
// PENTING: Fungsi ini harus di paling atas agar tersedia saat HTML load
window.acceptWarning = function() {
    console.log('Accept warning clicked');
    const warningOverlay = document.getElementById('warning-overlay');
    const body = document.body;
    
    if (warningOverlay) {
        warningOverlay.style.display = 'none';
        warningOverlay.classList.add('hidden');
    }
    
    if (body) {
        body.classList.remove('blur-content');
    }
    
    console.log('Warning dismissed');
};

// ==================== DATA CONFIGURATION ====================
// Edit data di bawah ini sesuai kebutuhan Anda

// Data untuk gallery gambar (thumbnail, banner, emote, logo)
const galleryData = {
    thumbnail: [
        { 
            img: 'assets/thumbnail/cheezzy.jpg', 
            client: 'Cheezzy', 
            date: '11-07-2025',
            social: {
                youtube: 'https://youtube.com/Cheezzy_',
                instagram: 'https://instagram.com/client1'
            }
        },
        { 
            img: 'assets/thumbnail/ajite14.jpg', 
            client: 'Ajite14', 
            date: '11-12-2024',
            social: {
                youtube: 'https://www.youtube.com/@ajite14',
                instagram: 'https://www.instagram.com/ajidhabie/'
            }
        },
    ],
    banner: [
        { 
            img: 'assets/banner/banner1.jpg', 
            client: 'Client Name 1', 
            date: '02-12-2025',
            social: {
                instagram: 'https://instagram.com/mhmmdrifqiial._'
            }
        }
    ],
    emote: [
        { 
            img: 'assets/emote/emote1.png', 
            client: 'Client Name 1', 
            date: '2024-02-05',
            social: {
                twitter: 'https://twitter.com/client1',
                instagram: 'https://instagram.com/client1'
            }
        }
    ],
    logo: [
        { 
            img: 'assets/logo/vtex.jpg', 
            client: 'Client Name 1', 
            date: '2024-01-30',
            social: {
                twitter: 'https://twitter.com/client1'
            }
        }
    ],
    tako: [
        { 
            img: 'assets/thumbnail/ajite14.png', 
            client: 'Coming Soon', 
            clientLabel: 'Project Name',
            date: '??-??-????',
            orderLabel: 'Qty', // Label baru untuk order date
            socialLabel: 'Preview Link',
            clientEmote: '🎯',
            dateIcon: '📦',
            social: {
                tako: 'https://twitter.com/client1'
            },
            price: 'Rp. 50.000',
        }
    ]
};

// Data untuk gallery video (stream-overlay, tournament)
const videoGalleryData = {
    'stream-overlay': [
        { 
            video: 'assets/stream-overlay/erga.webm', 
            client: 'Erga Irlianto', 
            date: '2024-01-12',
            social: {
                youtube: 'https://www.youtube.com/@ergairlianto',
                instagram: 'https://www.instagram.com/puffin.anvil'
            }
        }
    ],
    tournament: [
        { 
            video: 'assets/tournament/tournament1.webm', 
            client: 'Coming Soon', 
            date: '??-??-????',
            social: {}
        }
    ]
};

// Data untuk staff - TAMBAHKAN ROLE, DESCRIPTION, DAN SOCIAL MEDIA DI SINI
const staffData = [
    { 
        name: 'Chewie', 
        photo: 'assets/staff/chewie.png', 
        role: 'Owner & Head Designer',
        description: 'With 5+ years of design experience, I specialize in posters, animations, and stream visuals like thumbnails, banners, emotes, badges, and overlays. I enjoy tackling challenges and delivering quality, affordable designs that meet every client’s visual needs.',
        social: {
            instagram: 'https://www.instagram.com/zullwee',
            youtube: 'https://www.youtube.com/channel/UCWJPKqJUzMLkQHVK0ahfnMA'
        }
    },
    { 
        name: 'Zraa', 
        photo: 'assets/staff/zraa.png', 
        role: 'Developer & Web Designer',
        description: 'Focuses on building interactive, code-driven designs—such as Tako.id donation overlays and website elements—along with making preview mockups for clients.',
        social: {
            instagram: 'https://instagram.com/mhmmdrifqiial._',
            youtube: 'https://www.youtube.com/@othersidezraa'
        }
    },
];

// ==================== PARTICLE ANIMATION (SIMPLIFIED) ====================
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 40; // Dikurangi dari 100 menjadi 40

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = Math.random() > 0.5 ? '#0c33f4' : '#ffffff';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        // Hanya connect ke particle terdekat untuk mengurangi line
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Jarak dikurangi dari 100 menjadi 80
            if (distance < 80) {
                ctx.strokeStyle = `rgba(12, 51, 244, ${0.15 * (1 - distance / 80)})`;
                ctx.lineWidth = 0.3;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

initParticles();
animateParticles();

// ==================== CATEGORY NAVIGATION ====================
function showCategory(categoryId) {
    // Hide all categories
    const categories = document.querySelectorAll('.category-item');
    categories.forEach(cat => cat.classList.remove('active'));
    
    // Remove active from all buttons
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Show selected category
    document.getElementById(categoryId).classList.add('active');
    
    // Set button active
    event.target.closest('.category-btn').classList.add('active');
}

// ==================== GALLERY LOADING ====================
function loadImageGallery(categoryId, data) {
    const gallery = document.getElementById(`${categoryId}-gallery`);
    if (!gallery) return;
    
    gallery.innerHTML = '';
    
    if (data.length === 0) {
        gallery.innerHTML = '<p style="text-align: center; color: rgba(255,255,255,0.5); grid-column: 1/-1;">No items to display</p>';
        return;
    }
    
    data.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${item.img}" alt="${item.client}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22320%22 height=%22280%22%3E%3Crect fill=%22%230c33f4%22 width=%22320%22 height=%22280%22/%3E%3Ctext fill=%22white%22 x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-size=%2220%22%3ENo Image%3C/text%3E%3C/svg%3E'">
            <div class="gallery-info">
                <h3>${item.client}</h3>
            </div>
        `;
        
        galleryItem.onclick = () => openModal(item.img, item.client, item.date, item.social || {}, item.price, 'image', item.clientLabel || 'Client Name', item.orderLabel || 'Order Date', item.socialLabel || 'Social Media', item.clientEmote || '👤', item.dateIcon || '📅');
        gallery.appendChild(galleryItem);
    });
}


function loadVideoGallery(categoryId, data) {
    const gallery = document.getElementById(`${categoryId}-gallery`);
    gallery.innerHTML = '';
    
    if (data.length === 0) {
        gallery.innerHTML = '<p style="text-align: center; color: rgba(255,255,255,0.5); grid-column: 1/-1;">No items to display</p>';
        return;
    }
    
    data.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <video muted loop autoplay playsinline>
                <source src="${item.video}" type="video/webm">
                Your browser does not support the video tag.
            </video>
            <div class="gallery-info">
                <h3>${item.client}</h3>
            </div>
        `;
        
        galleryItem.onclick = () => openModal(item.video, item.client, item.date, item.social || {}, item.price, 'video', item.clientLabel || 'Client Name', item.orderLabel || 'Order Date', item.socialLabel || 'Social Media', item.clientEmote || '👤', item.dateIcon || '📅');
        gallery.appendChild(galleryItem);
    });
}

// ==================== STAFF LOADING ====================
function loadStaff() {
    const staffGrid = document.getElementById('staff-grid');
    staffGrid.innerHTML = '';
    
    staffData.forEach((staff, index) => {
        const staffCard = document.createElement('div');
        staffCard.className = 'staff-card';
        staffCard.innerHTML = `
            <div class="staff-photo">
                <img src="${staff.photo}" alt="${staff.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="staff-photo-placeholder" style="display: none;">👤</div>
            </div>
            <div class="staff-name">${staff.name}</div>
            <div class="staff-role">${staff.role}</div>
        `;
        staffCard.onclick = () => openStaffModal(staff);
        staffGrid.appendChild(staffCard);
    });
}

// ==================== MODAL ====================
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalVideo = document.getElementById('modal-video');
const modalClient = document.getElementById('modal-client');
const modalDate = document.getElementById('modal-date');
const modalSocial = document.getElementById('modal-social');
const modalTitle = document.querySelector('.modal-title');
const socialMediaContainer = document.getElementById('social-media-container');
const modalPrice = document.getElementById('modal-price');
const priceContainer = document.getElementById('price-container');
const closeBtn = document.querySelector('.close');

function openModal(src, client, date, social, price = 'Rp. -', type, clientLabel = 'Client Name', orderLabel = 'Order Date', socialLabel = 'Social Media', clientEmote = '👤', dateIcon = '📅') {
    modal.style.display = 'block';

    const modalClientLabel = document.querySelector('.detail-label');
    modalClientLabel.textContent = clientLabel;

    const modalDateLabel = document.querySelector('#modal-date').previousElementSibling;
    if (modalDateLabel) {
        modalDateLabel.textContent = orderLabel;
    }

    const modalSocialLabel = document.querySelector('#modal-social').previousElementSibling;
    if (modalSocialLabel) {
        modalSocialLabel.textContent = socialLabel;
    }

    const modalclientEmote = document.querySelector('.detail-item:nth-child(1) .detail-icon');
        modalclientEmote.textContent = clientEmote;

    const modaldateIcon = document.querySelector('.detail-item:nth-child(2) .detail-icon')
    modaldateIcon.textContent = dateIcon;
    
    // Set title
    modalTitle.textContent = type === 'video' ? 'Video Preview' : 'Image Preview';
    
    // Set client info
    modalClient.textContent = client;
    modalDate.textContent = date;
    modalPrice.textContent = price;
    
    // Set social media links
    modalSocial.innerHTML = '';
    if (social && Object.keys(social).length > 0) {
        socialMediaContainer.style.display = 'flex';
        
        if (social.twitter) {
            const twitterLink = document.createElement('a');
            twitterLink.href = social.twitter;
            twitterLink.target = '_blank';
            twitterLink.className = 'social-link';
            twitterLink.innerHTML = '🐦 Twitter';
            modalSocial.appendChild(twitterLink);
        }
        
        if (social.instagram) {
            const instaLink = document.createElement('a');
            instaLink.href = social.instagram;
            instaLink.target = '_blank';
            instaLink.className = 'social-link';
            instaLink.innerHTML = '📷 Instagram';
            modalSocial.appendChild(instaLink);
        }
        
        if (social.youtube) {
            const youtubeLink = document.createElement('a');
            youtubeLink.href = social.youtube;
            youtubeLink.target = '_blank';
            youtubeLink.className = 'social-link';
            youtubeLink.innerHTML = '🎥 YouTube';
            modalSocial.appendChild(youtubeLink);
        }

        if (social.tako) {
            const takoLink = document.createElement('a');
            takoLink.href = social.tako;
            takoLink.target = '_blank';
            takoLink.className = 'social-link';
            takoLink.innerHTML = '➡️ Click Here!';
            modalSocial.appendChild(takoLink)
        }
    } else {
        socialMediaContainer.style.display = 'none';
    }

    // if (price) {
    //     priceConatainer.style.display = "absolute";
    //     modalPrice.textContent = price;
    // } else {
    //     priceConatainer.style.display = "none";
    // }
    
    // Set website link (untuk Overlay Tako)
    // Jika ada website link, tampilkan tombol. Jika tidak ada, sembunyikan
    // if (websiteLink) {
    //     websiteLinkContainer.style.display = 'flex';
    //     modalWebsite.href = websiteLink;
    // } else {
    //     websiteLinkContainer.style.display = 'none';
    // }
    
    // Show media
    if (type === 'image') {
        modalImg.src = src;
        modalImg.classList.add('show');
        modalVideo.classList.remove('show');
        modalVideo.pause();
    } else {
        modalVideo.src = src;
        modalVideo.classList.add('show');
        modalImg.classList.remove('show');
        modalVideo.play();
    }
}

closeBtn.onclick = function() {
    modal.style.display = 'none';
    modalVideo.pause();
}

modal.onclick = function(e) {
    if (e.target === modal) {
        modal.style.display = 'none';
        modalVideo.pause();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        modalVideo.pause();
    }
    if (e.key === 'Escape' && staffModal.style.display === 'block') {
        staffModal.style.display = 'none';
    }
});

// ==================== STAFF MODAL ====================
const staffModal = document.getElementById('staff-modal');
const staffModalImg = document.getElementById('staff-modal-img');
const staffModalName = document.getElementById('staff-modal-name');
const staffModalRole = document.getElementById('staff-modal-role');
const staffModalDesc = document.getElementById('staff-modal-desc');
const staffModalSocial = document.getElementById('staff-modal-social');
const staffSocialContainer = document.getElementById('staff-social-container');

function openStaffModal(staff) {
    staffModal.style.display = 'block';
    
    // Set staff info
    staffModalImg.src = staff.photo;
    staffModalName.textContent = staff.name;
    staffModalRole.textContent = staff.role;
    staffModalDesc.textContent = staff.description;
    
    // Set social media links
    staffModalSocial.innerHTML = '';
    if (staff.social && Object.keys(staff.social).length > 0) {
        staffSocialContainer.style.display = 'flex';
        
        if (staff.social.twitter) {
            const twitterLink = document.createElement('a');
            twitterLink.href = staff.social.twitter;
            twitterLink.target = '_blank';
            twitterLink.className = 'social-link';
            twitterLink.innerHTML = '🐦 Twitter';
            staffModalSocial.appendChild(twitterLink);
        }
        
        if (staff.social.instagram) {
            const instaLink = document.createElement('a');
            instaLink.href = staff.social.instagram;
            instaLink.target = '_blank';
            instaLink.className = 'social-link';
            instaLink.innerHTML = '📷 Instagram';
            staffModalSocial.appendChild(instaLink);
        }
        
        if (staff.social.discord) {
            const discordTag = document.createElement('span');
            discordTag.className = 'social-link';
            discordTag.style.cursor = 'default';
            discordTag.innerHTML = '💬 ' + staff.social.discord;
            staffModalSocial.appendChild(discordTag);
        }
    } else {
        staffSocialContainer.style.display = 'none';
    }
}

function closeStaffModal() {
    staffModal.style.display = 'none';
}

staffModal.onclick = function(e) {
    if (e.target === staffModal) {
        staffModal.style.display = 'none';
    }
}

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    // Load image galleries
    loadImageGallery('thumbnail', galleryData.thumbnail);
    loadImageGallery('banner', galleryData.banner);
    loadImageGallery('emote', galleryData.emote);
    loadImageGallery('logo', galleryData.logo);
    loadImageGallery('tako', galleryData.tako);
    // Load video galleries
    loadVideoGallery('stream-overlay', videoGalleryData['stream-overlay']);
    loadVideoGallery('tournament', videoGalleryData.tournament);
    
    // Load staff
    loadStaff();
    
    console.log('✅ CHEWIELAND Website loaded successfully!');
});