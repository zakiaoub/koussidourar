import { Injectable } from '@angular/core';
import stores from '../../../assets/mock-data/stores.json'
import products from '../../../assets/json/products.json'

@Injectable()
export class CarousleService {
    getProductsData() {
        return products
    }
    getStoresData() {
        return stores.stores
    }

    getReviewsData() {
        return [
            {
                id: 1,
                name: 'John smith',
                title: 'buyer',
                image: 'https://randomuser.me/api/portraits/men/24.jpg',
                review: {
                    fr: "Excellent service. En quelques minutes, notre voyage familial  est organisé au moindre coût. C’est juste génial !",
                    en: "Excellent service. Our family trip was organized in just a few minutes at the lowest cost. It's just fantastic!",
                    es: "Excelente servicio. Nuestro viaje familiar se organizó en tan solo unos minutos al menor coste. ¡Es simplemente fantástico!"

                }
            },
            {
                id: 2,
                name: 'Jennie Nichols',
                title: 'seller',
                image: 'https://mannatthemes.com/rizz/default/assets/images/users/avatar-2.jpg',
                review: {
                    fr: "Un boost incroyable pour mes produits de voyage. Je suis très contente pourvu que ça continue.",
                    en: "An incredible boost for my travel products. I'm very happy, let's hope it continues.",
                    es: "Un impulso increíble para mis productos de viaje. Estoy muy feliz mientras continúe."

                }
            },
            {
                id: 3,
                name: 'Nick simons',
                title: 'tenant',
                image: 'https://mannatthemes.com/rizz/default/assets/images/users/avatar-6.jpg',
                review: {
                    fr: "Une augmentation palpable de notre visibilité ! Depuis qu’on est dans le Mall, on est de plus en plus sollicité ! ",
                    en: "A tangible increase in our visibility! Since we've been in the Mall, we've been getting more and more in demand !",
                    es: "¡Un aumento palpable en nuestra visibilidad! Desde que estamos en el centro comercial, ¡tenemos cada vez más demanda!"
                }
            }
        ];
    }

    getBuyersData() {
        return [
            { title: "security", content: "security_caption" },
            { title: "quick_and_easy", content: "quick_and_easy_caption" },
            { title: "competitive_rates", content: "competitive_rates_caption" },
            { title: "exclusive_offers", content: "exclusive_offers_caption" },
            { title: "flexible_payments", content: "flexible_payments_caption" },
        ]
    }


    getProducts() {
        return Promise.resolve(this.getProductsData());
    }

    getBuyers() {
        return Promise.resolve(this.getBuyersData());
    }


    getStores() {
        return Promise.resolve(this.getStoresData());
    }

    getReviews() {
        return Promise.resolve(this.getReviewsData());
    }
};