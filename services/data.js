const data = {
    navMenuItems() {
        return [
            {
                url: '/',
                text: 'Главная'
            },
            {
                url: '/#pricelist',
                text: 'Прайс-лист'
            },
            {
                url: '/services',
                text: 'Услуги'
            },
            {
                url: '/review',
                text: 'Отзывы'
            },
            {
                url: '/contacts',
                text: 'Контакты'
            },
        ]
    },
    priceList() {
        return [
            {
                master: 'Настя Маникюр',
                services: [
                    {
                        service: 'Гигиенический маникюр',
                        price: 1200,
                        photo: 'https://f2.dikidi.net/c16/v15329/3if3ipvup3.jpg'
                    },
                    {
                        service: 'Дизайн',
                        price: 100,
                        photo: 'https://f2.dikidi.net/c16/v15329/38i9d54ri8.jpg'
                    },
                    {
                        service: 'Мужской маникюр',
                        price: 1200,
                        photo: 'https://f2.dikidi.net/c16/v15817/6cbhvhh8u3.jpg'
                    },
                    {
                        service: 'Маникюр с покрытием',
                        price: 2000,
                        photo: 'https://f2.dikidi.net/c16/v15329/12vgffsdan.jpg'
                    }
                ]
            },
            {
                master: 'Настя Педикюр',
                services: [
                    {
                        service: 'Гигиенический педикюр без покрытия',
                        price: 2200,
                        photo: 'https://f2.dikidi.net/c16/v15330/78dg7sa9h7.jpg'
                    },
                    {
                        service: 'Мужской педикюр',
                        price: 3500,
                        photo: 'https://f2.dikidi.net/c16/v15817/43fqu7s832.jpg'
                    },
                    {
                        service: 'Педикюр с покрытием',
                        price: 2500,
                        photo: 'https://f2.dikidi.net/c16/v15330/2pvc5o09th.jpg'
                    },
                    {
                        service: 'Френч',
                        price: 500,
                        photo: 'https://f2.dikidi.net/c16/v15330/1e66k8mr8a.jpg'
                    }
                ]
            },
            {
                master: 'Олеся Педикюр',
                services: [
                    {
                        service: 'Консультация',
                        price: 1200,
                        photo: 'https://f2.dikidi.net/c16/v15329/3if3ipvup3.jpg'
                    },
                    {
                        service: 'Коррекция титановой нитью',
                        price: 2200,
                        photo: 'https://f2.dikidi.net/c16/v15330/78dg7sa9h7.jpg'
                    },
                    {
                        service: 'Мужской педикюр',
                        price: 2200,
                        photo: 'https://f2.dikidi.net/c16/v15330/78dg7sa9h7.jpg'
                    },
                    {
                        service: 'Обработка стопы',
                        price: 2500,
                        photo: 'https://f2.dikidi.net/c16/v15330/2pvc5o09th.jpg'
                    }
                ]
            }
        ]
    },
    reviews() {
        return [
            {
                name: 'John Doe',
                text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
                photo: 'https://f2.dikidi.net/c16/v15330/2pvc5o09th.jpg'
            },
            {
                name: 'Jane Smith',
                text: 'I love the atmosphere and the quality of work.',
                photo: ''
            },
            {
                name: 'Emily Johnson',
                text: 'Highly recommend this place to everyone!',
                photo: ''
            }
        ];
    },
    availableServices() {
        // Combined list of all services for easy selection
        return [
            {
                id: 1,
                service: 'Гигиенический маникюр',
                price: 1200,
                duration: 60, // minutes
                category: 'manicure'
            },
            {
                id: 2,
                service: 'Маникюр с покрытием',
                price: 2000,
                duration: 90,
                category: 'manicure'
            },
            {
                id: 3,
                service: 'Дизайн ногтей',
                price: 500,
                duration: 30,
                category: 'manicure'
            },
            {
                id: 4,
                service: 'Гигиенический педикюр',
                price: 2200,
                duration: 60,
                category: 'pedicure'
            },
            {
                id: 5,
                service: 'Педикюр с покрытием',
                price: 2500,
                duration: 90,
                category: 'pedicure'
            },
            {
                id: 6,
                service: 'Обработка стопы',
                price: 1800,
                duration: 45,
                category: 'pedicure'
            },
            {
                id: 7,
                service: 'Консультация',
                price: 1200,
                duration: 30,
                category: 'consultation'
            },
            {
                id: 8,
                service: 'Коррекция титановой нитью',
                price: 2200,
                duration: 60,
                category: 'correction'
            }
        ];
    },
    availableDates() {
        // Generate next 14 days with available time slots
        const dates = [];
        const today = new Date();
        
        for (let i = 1; i <= 14; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            
            // Skip weekends (0 = Sunday, 6 = Saturday)
            if (date.getDay() === 0 || date.getDay() === 6) {
                continue;
            }
            
            // Generate time slots (10:00 - 18:00)
            const timeSlots = [];
            for (let hour = 10; hour <= 17; hour++) {
                // Only add some time slots to simulate real availability
                if (Math.random() > 0.3) { // 70% chance to be available
                    timeSlots.push(`${hour}:00`);
                }
                if (hour < 17 && Math.random() > 0.5) { // 50% chance to be available
                    timeSlots.push(`${hour}:30`);
                }
            }
            
            if (timeSlots.length > 0) {
                dates.push({
                    date: date.toISOString().split('T')[0], // YYYY-MM-DD format
                    formattedDate: date.toLocaleDateString('ru-RU', { 
                        day: 'numeric', 
                        month: 'long',
                        weekday: 'long'
                    }),
                    timeSlots: timeSlots
                });
            }
        }
        
        return dates;
    }
};

export default data;
