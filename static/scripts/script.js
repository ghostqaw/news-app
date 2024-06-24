document.addEventListener('DOMContentLoaded', () => {
    const newsList = [
        {
            id: 1,
            title: 'Қазақстанның жаңа Үкіметі',
            description: 'Қазақстанда жаңа Үкімет құрылды, премьер-министр ретінде Олжас Бектенов тағайындалды. Оның командасына төрт жаңа министр қосылды.',
            image: 'assets/new_government.jpg',
            category: 'Саясат'
        },
        {
            id: 2,
            title: 'Қазақстан мен Қытай арасындағы ынтымақтастық',
            description: 'Қазақстан мен Қытай өзара экономикалық ынтымақтастықты нығайтуға бағытталған жаңа жобаларды талқылады.',
            image: 'assets/kazakhstan_china_cooperation.jpg',
            category: 'Экономика'
        },
        {
            id: 3,
            title: 'Қазақ спортшыларының жеңістері',
            description: 'Астаналық Ильхан Достиев пен Макс Уокер бір күнде екі жеңіске жетті. Қазақ дзюдошылары әлем чемпионатында қола медаль иеленді.',
            image: 'assets/kazakh_athletes_wins.jpg',
            category: 'Спорт'
        },
        {
            id: 4,
            title: 'Алматыда жаңа көрме ашылды',
            description: 'Алматы музейінде Абілхан Қастеевке арналған жаңа көрме ашылды.',
            image: 'assets/abylkhan_kasteev_exhibition.jpg',
            category: 'Мәдениет'
        },
        {
            id: 5,
            title: 'Су тасқынынан зардап шеккендерге көмек',
            description: 'Қазақстанда су тасқынынан зардап шеккен 16 000-нан астам отбасына көмек көрсетілді.',
            image: 'assets/flood_relief.jpg',
            category: 'Қоғам'
        },
        {
            id: 6,
            title: 'Технологиялық инновациялар Қазақстанда',
            description: 'Қазақстанда жаңа инновациялық технологиялық хаб ашылды, который поможет развивать стартапы и IT-индустрию.',
            image: 'assets/tech_innovations.jpg',
            category: 'Экономика'
        },
        {
            id: 7,
            title: 'Экологиялық инициатива в Атырау',
            description: 'В Атырау запущена новая экологическая инициатива по очистке рек и озер.',
            image: 'assets/eco_initiative.jpg',
            category: 'Қоғам'
        },
    ];

    function displayNews(category) {
        const topNewsContainer = document.querySelector('.top-news');
        const newsContainer = document.querySelector('.news-list');
        topNewsContainer.innerHTML = '';
        newsContainer.innerHTML = '';

        const filteredNews = category === 'Барлық жаңалықтар'
            ? newsList
            : newsList.filter(news => news.category === category);

        filteredNews.slice(0, 2).forEach(news => {
            const newsItem = document.createElement('article');
            newsItem.className = 'news-item';
            newsItem.innerHTML = `
                <img src="${news.image}" alt="${news.title}">
                <div class="article-content">
                    <h2>${news.title}</h2>
                    <p>${news.description}</p>
                </div>
            `;
            newsItem.addEventListener('click', () => openNews(news.id));
            topNewsContainer.appendChild(newsItem);
        });

        filteredNews.slice(2).forEach(news => {
            const newsItem = document.createElement('article');
            newsItem.className = 'news-item';
            newsItem.innerHTML = `
                <h3>${news.title}</h3>
                <p>${news.description}</p>
            `;
            newsItem.addEventListener('click', () => openNews(news.id));
            newsContainer.appendChild(newsItem);
        });
    }

    function openNews(id) {
        const news = newsList.find(news => news.id === id);
        if (news) {
            const mainContent = document.querySelector('#main-content');
            mainContent.innerHTML = `
                <article>
                    <h1>${news.title}</h1>
                    <img src="${news.image}" alt="${news.title}">
                    <p>${news.description}</p>
                    <button id="back-button">Артқа</button>
                </article>
            `;
            document.querySelector('#back-button').addEventListener('click', () => displayNews('Барлық жаңалықтар'));
        }
    }

    document.querySelector('#search-button').addEventListener('click', () => {
        const searchText = document.querySelector('#search-input').value.toLowerCase();
        const filteredNews = newsList.filter(news => news.title.toLowerCase().includes(searchText) || news.description.toLowerCase().includes(searchText));
        displayFilteredNews(filteredNews);
    });

    function displayFilteredNews(filteredNews) {
        const topNewsContainer = document.querySelector('.top-news');
        const newsContainer = document.querySelector('.news-list');
        topNewsContainer.innerHTML = '';
        newsContainer.innerHTML = '';

        filteredNews.slice(0, 2).forEach(news => {
            const newsItem = document.createElement('article');
            newsItem.className = 'news-item';
            newsItem.innerHTML = `
                <img src="${news.image}" alt="${news.title}">
                <div class="article-content">
                    <h2>${news.title}</h2>
                    <p>${news.description}</p>
                </div>
            `;
            newsItem.addEventListener('click', () => openNews(news.id));
            topNewsContainer.appendChild(newsItem);
        });

        filteredNews.slice(2).forEach(news => {
            const newsItem = document.createElement('article');
            newsItem.className = 'news-item';
            newsItem.innerHTML = `
                <h3>${news.title}</h3>
                <p>${news.description}</p>
            `;
            newsItem.addEventListener('click', () => openNews(news.id));
            newsContainer.appendChild(newsItem);
        });
    }

    document.querySelector('#subscribe-form').addEventListener('submit', (event) => {
        event.preventDefault();
        const email = document.querySelector('#subscribe-email').value;
        if (email) {
            alert(`Жазылым сәтті рәсімделді: ${email}`);
        }
    });

    document.querySelector('#home-link').addEventListener('click', () => displayNews('Барлық жаңалықтар'));
    document.querySelector('#politics-link').addEventListener('click', () => displayNews('Саясат'));
    document.querySelector('#economics-link').addEventListener('click', () => displayNews('Экономика'));
    document.querySelector('#sports-link').addEventListener('click', () => displayNews('Спорт'));
    document.querySelector('#culture-link').addEventListener('click', () => displayNews('Мәдениет'));
    document.querySelector('#society-link').addEventListener('click', () => displayNews('Қоғам'));


    function openProfile() {
        const mainContent = document.querySelector('#main-content');
        mainContent.innerHTML = `
            <section class="auth-section">
                <h2>Авторизация / Тіркелу</h2>
                <form id="auth-form">
                    <input type="email" id="auth-email" placeholder="Электрондық пошта" required>
                    <input type="password" id="auth-password" placeholder="Құпиясөз" required>
                    <button type="submit">Кіру</button>
                    <p>Аккаунтыңыз жоқ па? <a href="#" id="register-link">Тіркелу</a></p>
                </form>
                <form id="register-form" style="display: none;">
                    <input type="email" id="register-email" placeholder="Электрондық пошта" required>
                    <input type="password" id="register-password" placeholder="Құпиясөз" required>
                    <input type="password" id="register-password-confirm" placeholder="Құпиясөзді растаңыз" required>
                    <button type="submit">Тіркелу</button>
                    <p>Аккаунтыңыз бар ма? <a href="#" id="login-link">Кіру</a></p>
                </form>
            </section>
        `;

        document.querySelector('#auth-form').addEventListener('submit', (event) => {
            event.preventDefault();
            alert('Сәтті авторизация!');
        });

        document.querySelector('#register-form').addEventListener('submit', (event) => {
            event.preventDefault();
            alert('Сәтті тіркелу!');
        });

        document.querySelector('#register-link').addEventListener('click', (event) => {
            event.preventDefault();
            document.querySelector('#auth-form').style.display = 'none';
            document.querySelector('#register-form').style.display = 'block';
        });

        document.querySelector('#login-link').addEventListener('click', (event) => {
            event.preventDefault();
            document.querySelector('#register-form').style.display = 'none';
            document.querySelector('#auth-form').style.display = 'block';
        });
    }

    // Initial load
    displayNews('Барлық жаңалықтар');
});

document.addEventListener('DOMContentLoaded', () => {
    const logoutLink = document.querySelector('#logout-link');
    const closeLogoutModal = document.querySelector('#closeLogoutModal');
    const logoutModal = document.querySelector('#logoutModal');

    // Only add the event listener if the logout link exists
    if (logoutLink) {
        logoutLink.addEventListener('click', (event) => {
            event.preventDefault();
            // Show the modal
            if (logoutModal) {
                logoutModal.style.display = 'block';
            }

            // Log out the user
            fetch('/users/logout/', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': getCookie('csrftoken'),
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    // User is logged out, update the UI
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 2000);
                }
            });
        });
    }

    // Only add the event listener if the close modal button exists
    if (closeLogoutModal) {
        closeLogoutModal.addEventListener('click', () => {
            if (logoutModal) {
                logoutModal.style.display = 'none';
            }
            window.location.href = '/';
        });
    }

    // Function to get the CSRF token
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});

