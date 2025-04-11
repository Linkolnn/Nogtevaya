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
        // Combined list of masters and services with complete information
        return [
            {
                master: 'Настя Маникюр',
                services: [
                    {
                        id: 1,
                        service: 'Гигиенический маникюр',
                        price: 1200,
                        duration: 60,
                        category: 'manicure',
                        photo: 'https://f2.dikidi.net/c16/v15329/3if3ipvup3.jpg'
                    },
                    {
                        id: 2,
                        service: 'Дизайн ногтей',
                        price: 100,
                        duration: 10,
                        category: 'manicure',
                        photo: 'https://f2.dikidi.net/c16/v15329/38i9d54ri8.jpg'
                    },
                    {
                        id: 3,
                        service: 'Мужской маникюр',
                        price: 1200,
                        duration: 60,
                        category: 'manicure',
                        photo: 'https://f2.dikidi.net/c16/v15817/6cbhvhh8u3.jpg'
                    },
                    {
                        id: 4,
                        service: 'Маникюр с покрытием',
                        price: 2000,
                        duration: 90,
                        category: 'manicure',
                        photo: 'https://f2.dikidi.net/c16/v15329/12vgffsdan.jpg'
                    },
                    {
                        id: 5,
                        service: 'Ремонт ногтя',
                        price: 100,
                        duration: 10,
                        category: 'manicure',
                        photo: 'https://f2.dikidi.net/c16/v15661/3q352e487p.jpg'
                    },
                    {
                        id: 6,
                        service: 'Снятие чужой работы',
                        price: 200,
                        duration: 10,
                        category: 'manicure',
                    },
                    {
                        id: 7,
                        service: 'Френч',
                        price: 500,
                        duration: 20,
                        category: 'manicure',
                        photo: 'https://f2.dikidi.net/c16/v15329/1k5gqihu2g.jpg'
                    }
                ]
            },
            {
                master: 'Настя Педикюр',
                services: [
                    {
                        id: 5,
                        service: 'Гигиенический педикюр',
                        price: 2200,
                        duration: 120,
                        category: 'pedicure',
                        photo: 'https://f2.dikidi.net/c16/v15330/78dg7sa9h7.jpg'
                    },
                    {
                        id: 6,
                        service: 'Мужской педикюр',
                        price: 3500,
                        duration: 120,
                        category: 'pedicure',
                        photo: 'https://f2.dikidi.net/c16/v15817/43fqu7s832.jpg'
                    },
                    {
                        id: 7,
                        service: 'Педикюр с покрытием',
                        price: 2500,
                        duration: 120,
                        category: 'pedicure',
                        photo: 'https://f2.dikidi.net/c16/v15330/2pvc5o09th.jpg'
                    },
                    {
                        id: 8,
                        service: 'Снятие чужой работы',
                        price: 200,
                        duration: 20,
                        category: 'pedicure',
                    },
                    {
                        id: 9,
                        service: 'Френч',
                        price: 500,
                        duration: 20,
                        category: 'pedicure',
                        photo: 'https://f2.dikidi.net/c16/v15330/1e66k8mr8a.jpg'
                    },
                    {
                        id: 10,
                        service: 'Экспресс педикюр',
                        price: 2300,
                        duration: 120,
                        category: 'pedicure',
                        photo: 'https://f2.dikidi.net/c16/v15330/21ogsvad6i.jpg'
                    }
                ]
            },
            {
                master: 'Олеся Педикюр',
                services: [
                    {
                        id: 9,
                        service: 'Консультация',
                        price: 1000,
                        duration: 30,
                        category: 'consultation',
                        photo: 'https://f1.dikidi.net/c4/v3808/5e5pjc82in.jpg'
                    },
                    {
                        id: 10,
                        service: 'Коррекция титановой нитью',
                        price: 1500,
                        duration: 60,
                        category: 'correction',
                        photo: ''
                    },
                    {
                        id: 11,
                        service: 'Мужской педикюр',
                        price: 3500,
                        duration: 120, 
                        category: 'pedicure',
                        photo: 'https://f1.dikidi.net/c5/v4238/4u0mbt1qnv.jpg'
                    },
                    {
                        id: 12,
                        service: 'Обработка стопы',
                        price: 2000,
                        duration: 60,
                        category: 'pedicure',
                        photo: 'https://f1.dikidi.net/c12/v11803/6iggbroqv5.jpg'
                    },
                    {
                        id: 13,
                        service: 'Полный педикюр без покрытия',
                        price: 2500,
                        duration: 60,
                        category: 'pedicure',
                        photo: 'https://f1.dikidi.net/c4/v3808/1s5m9123ak.jpg'
                    },
                    {
                        id: 14,
                        service: 'Полный педикюр с покрытием',
                        price: 3000,
                        duration: 90,
                        category: 'pedicure',
                        photo: 'https://f1.dikidi.net/c12/v11500/3ipv2kok2s.jpg'
                    },
                    {
                        id: 15,
                        service: 'Полный педикюр с трещинами',
                        price: 3500,
                        duration: 120,
                        category: 'pedicure',
                        photo: 'https://f1.dikidi.net/c4/v3808/4r8tdh99s3.jpg'
                    },
                    {
                        id: 16,
                        service: 'Снятие титановой нитью',
                        price: 600,
                        duration: 10,
                        category: 'pedicure',
                        photo: ''
                    },
                    {
                        id: 17,
                        service: 'Снятие чужой работы',
                        price: 200,
                        duration: 20,
                        category: 'pedicure',
                        photo: ''
                    },
                    {
                        id: 18,
                        service: 'Установка титановой нити',
                        price: 3000,
                        duration: 60,
                        category: 'pedicure',
                        photo: ''
                    },
                    {
                        id: 19,
                        service: 'Френч',
                        price: 400,
                        duration: 20,
                        category: 'pedicure',
                        photo: 'https://f1.dikidi.net/c4/v3808/1s5m9123ak.jpg'
                    },
                    {
                        id: 20,
                        service: 'Экспресс педикюр',
                        price: 2300,
                        duration: 60,
                        category: 'pedicure',
                        photo: 'https://f1.dikidi.net/c12/v11500/5tlagosoti.jpg'
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
                photo: 'https://f2.dikidi.net/c16/v15330/2pvc5o09th.jpg',
                rating: 5
            },
            {
                name: 'Jane Smith',
                text: 'I love the atmosphere and the quality of work.',
                photo: '',
                rating: 4
            },
            {
                name: 'Emily Johnson',
                text: 'Highly recommend this place to everyone!',
                photo: '',
                rating: 5
            },
            {
                name: 'Alex Thompson',
                text: 'Good service, but the waiting time was a bit long.',
                photo: '',
                rating: 3
            },
            {
                name: 'Maria Rodriguez',
                text: 'The nail technician was very professional and skilled.',
                photo: '',
                rating: 4
            }
        ];
    },
    availableDates() {
        // Generate next 30 days with available time slots
        const dates = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time part
        
        for (let i = 1; i <= 30; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            
            // Determine if date is available (Monday to Friday are available, weekends are not)
            const dayOfWeek = date.getDay();
            // Update: Now make Sunday unavailable but Saturday available
            const isSunday = dayOfWeek === 0;
            const isAvailable = !isSunday; // Only Sunday is unavailable
            
            // Generate time slots (10:00 - 18:00) if the date is available
            const timeSlots = [];
            if (isAvailable) {
                // For Monday, always add fixed time slots
                if (dayOfWeek === 1) { // Monday
                    for (let hour = 9; hour <= 17; hour++) {
                        timeSlots.push(`${String(hour).padStart(2, '0')}:00`);
                        if (hour < 17) {
                            timeSlots.push(`${String(hour).padStart(2, '0')}:30`);
                        }
                    }
                } 
                // For Saturday, add time slots from 11:00 to 17:00
                else if (dayOfWeek === 6) { // Saturday
                    for (let hour = 11; hour <= 17; hour++) {
                        timeSlots.push(`${String(hour).padStart(2, '0')}:00`);
                        if (hour < 17) {
                            timeSlots.push(`${String(hour).padStart(2, '0')}:30`);
                        }
                    }
                }
                else {
                    // For other weekdays, use random availability
                    for (let hour = 10; hour <= 17; hour++) {
                        if (Math.random() > 0.3) { // 70% chance to be available
                            timeSlots.push(`${String(hour).padStart(2, '0')}:00`);
                        }
                        if (hour < 17 && Math.random() > 0.5) { // 50% chance to be available
                            timeSlots.push(`${String(hour).padStart(2, '0')}:30`);
                        }
                    }
                }
                
                // Sort time slots for better display
                timeSlots.sort();
            }
            
            // Format the date consistently using local time
            const formattedDate = date.getFullYear() + '-' + 
                String(date.getMonth() + 1).padStart(2, '0') + '-' + 
                String(date.getDate()).padStart(2, '0');
            
            // Add the date to the list
            dates.push({
                date: formattedDate,
                formattedDate: date.toLocaleDateString('ru-RU', { 
                    day: 'numeric', 
                    month: 'long',
                    weekday: 'long'
                }),
                timeSlots: timeSlots,
                isAvailable: isAvailable && timeSlots.length > 0 // Only available if there are time slots
            });
        }
        
        return dates;
    }
};

export default data;
