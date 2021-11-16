/* eslint-disable camelcase */
import { getPreciseDistance } from 'geolib';
/* eslint-disable import/no-unresolved */
import { API_URL } from '@env';
import methods from './methods';

const baseHttpApi = API_URL;

const getSaleStatus = (status) => {
    if (status === 20) {
        return 'Ολοκληρώθηκε';
    } if (status === 30) {
        return 'Ακυρώθηκε';
    }
    return 'Αναμονή παραλαβής';
};

const mapDistance = (
    sellerLatitude,
    sellerLongitude,
    userLongitude,
    userLatitude,
) => getPreciseDistance(
    { latitude: userLatitude, longitude: userLongitude },
    { latitude: sellerLatitude, longitude: sellerLongitude },
    1,
);

const mapProduct = (product, userLongitude, userLatitude) => {
    const {
        id, name, image, salesproduct_set, category, manufacturer,
    } = product;
    const sellers = [];

    salesproduct_set.forEach((i) => {
        const sliceIndex = i.company.location.geolocation.indexOf(',');
        const latitude = parseFloat(
            i.company.location.geolocation.substring(0, sliceIndex),
        );
        const longitude = parseFloat(
            i.company.location.geolocation.substring(sliceIndex + 1),
        );

        sellers.push({
            id: i.company.id,
            name: i.company.name,
            location: {
                latitude,
                longitude,
            },
            distance: mapDistance(latitude, longitude, userLongitude, userLatitude),
            discountPrice: parseInt(i.offer.map((x) => x.discount_price), 10),
            discountRate: parseInt(i.offer.map((x) => x.discount_rate), 10),
            price: i.price,
            quantity: i.quantity,
        });
    });

    return {
        id,
        name,
        manufacturer: manufacturer.name,
        images: image.map((x) => baseHttpApi + x.image),
        thumbnails: image.map((x) => baseHttpApi + x.thumbnail),
        categoryType: category.type,
        sellers,
        minPrice: Math.min(
            ...sellers.map((x) => (Number.isNaN(x.discountPrice) ? x.price : x.discountPrice)),
        ),
        minDistance: Math.min(...sellers.map((x) => x.distance)),
    };
};

const mapProductDetails = (field, categoryType) => {
    switch (categoryType) {
    case 10:
    case 20:
        return {
            name: field.product_ptr.name,
            description: field.product_ptr.description.replace('\n', ' '),
            color: field.color,
            colorLabel: field.get_color_display,
            material: field.material,
            materialLabel: field.get_material_display,
            manufacturer: field.manufacturer.name,
        };
    case 30:
        return {
            name: field.product_ptr.name,
            description: field.product_ptr.description.replace('\n', ' '),
            color: field.color,
            colorLabel: field.get_color_display,
            material: field.material,
            materialLabel: field.get_material_display,
            type: field.type,
            typelabel: field.get_type_display,
            manufacturer: field.manufacturer.name,
        };
    case 35:
        return {
            name: field.product_ptr.name,
            description: field.product_ptr.description.replace('\n', ' '),
            color: field.color,
            colorLabel: field.get_color_display,
            material: field.material,
            materialLabel: field.get_material_display,
            typeOfClosing: field.type_of_closing,
            typeOfClosingLabel: field.get_type_of_closing_display,
            type: field.type,
            typeLabel: field.get_type_display,
            manufacturer: field.manufacturer.name,
        };
    case 40:
        return {
            name: field.product_ptr.name,
            description: field.product_ptr.description.replace('\n', ' '),
            bandColor: field.band_color,
            bandColorLabel: field.get_band_color_display,
            faceColor: field.face_color,
            faceColorLabel: field.get_face_color_display,
            material: field.material,
            materialLabel: field.get_material_display,
            bandMaterial: field.band_material,
            bandMaterialLabel: field.get_band_material_display,
            display: field.display,
            displayLabel: field.get_display_display,
            mechanism: field.mechanism,
            mechanismLabel: field.get_mechanism_display,
            waterResistance: field.water_resistance,
            waterResistanceLabel: field.get_water_resistance_display,
            manufacturer: field.manufacturer.name,
        };
    default:
        return null;
    }
};

const mapHistory = (historyItem) => {
    const {
        company,
        product,
        date_added,
        paid_with_money,
        quantity,
        selling_price,
        status,
    } = historyItem;

    const sliceIndex = company.location.geolocation.indexOf(',');
    const latitude = parseFloat(
        company.location.geolocation.substring(0, sliceIndex),
    );
    const longitude = parseFloat(
        company.location.geolocation.substring(sliceIndex + 1),
    );

    return {
        id: product.id,
        company: {
            id: company.id,
            name: company.name,
            location: {
                latitude,
                longitude,
            },
        },
        name: product.name,
        image: baseHttpApi + product.image,
        thumbnail: baseHttpApi + product.thumbnail,
        dateAdded: methods.getJSDatetToString(methods.formatJSDate(date_added)),
        paidWithMoney: paid_with_money,
        quantity,
        sellingPrice: selling_price * quantity,
        status: getSaleStatus(status),
        statusCode: status,
    };
};

const mapFavorites = (favoriteItem) => {
    const {
        id, name, image, thumbnail,
    } = favoriteItem;

    return {
        id,
        name,
        image: baseHttpApi + image,
        thumbnail: baseHttpApi + thumbnail,
    };
};

const mapUserInfo = (userInfo) => {
    const {
        user, gender, orange_points, phone_number, birth_date, device_id,
    } = userInfo;

    const phoneNumber = phone_number.replace('+30', '');

    return {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        birthDate: methods.formatJSDate(birth_date),
        gender,
        email: user.email,
        phoneNumber,
        deviceId: device_id,
        orangePoints: orange_points,
    };
};

export const auth = (email, password) => fetch(`${baseHttpApi}/api/auth/`, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        username: email,
        password,
    }),
})
    .then((response) => response.json())
    .then((response) => {
        const history = response.history.map((historyItem) => mapHistory(historyItem));

        const favorites = response.favorites.map((favoriteItem) => mapFavorites(favoriteItem));

        const pendingPurchases = history.filter((item) => item.statusCode === 10);

        const userInfo = Object.values(
            response.user_info.map((user) => mapUserInfo(user)),
        )[0];

        const { token } = response;

        return {
            token,
            history,
            favorites: [...pendingPurchases, ...favorites],
            userInfo,
        };
    });

export const getUserInfoApi = (loggedInToken) => fetch(`${baseHttpApi}/api/get-user-info/?format=json`, {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${loggedInToken}`,
    },
})
    .then((response) => response.json())
    .then((response) => {
        const history = response.history.map((historyItem) => mapHistory(historyItem));

        const favorites = response.favorites.map((favoriteItem) => mapFavorites(favoriteItem));

        const pendingPurchases = history.filter((item) => item.statusCode === 10);

        const userInfo = Object.values(
            response.user_info.map((user) => mapUserInfo(user)),
        )[0];

        return {
            history,
            favorites: [...pendingPurchases, ...favorites],
            userInfo,
        };
    });

export const signUpApi = (
    deviceId,
    email,
    firstName,
    lastName,
    password,
    phoneNumber,
    birthDate,
    gender,
) => fetch(`${baseHttpApi}/api/sign-up/?format=json`, {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        customer: {
            device_id: deviceId,
            gender,
            phone_number: methods.formatPhoneNumber(phoneNumber),
            birth_date: methods.formatPyhtonDate(birthDate),
        },
        email,
        first_name: firstName,
        last_name: lastName,
        password,
    }),
})
    .then((response) => response.json().then((data) => {
        const userInfo = Object.values(
            data.user_info.map((user) => mapUserInfo(user)),
        )[0];

        return {
            status: response.status,
            body: data,
            token: data.token,
            userInfo,
        };
    }));

export const changePasswordApi = (
    id,
    oldPassword,
    newPassword,
    loggedInToken,
) => fetch(`${baseHttpApi}/api/password-change/${id}/?format=json`, {
    method: 'PATCH',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${loggedInToken}`,
    },
    body: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
    }),
})
    .then((response) => response.json().then((data) => ({
        status: response.status,
        body: data,
    })));

export const changeInfoApi = (
    id,
    email,
    firstName,
    lastName,
    phoneNumber,
    birthDate,
    loggedInToken,
) => fetch(`${baseHttpApi}/api/change-info/${id}/?format=json`, {
    method: 'PATCH',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Token ${loggedInToken}`,
    },
    body: JSON.stringify({
        customer: {
            phone_number: methods.formatPhoneNumber(phoneNumber),
            birth_date: methods.formatPyhtonDate(birthDate),
        },
        email,
        first_name: firstName,
        last_name: lastName,
    }),
})
    .then((response) => response.json().then((data) => ({
        status: response.status,
        body: data,
    })));

export const removeFavoriteApi = (productId, loggedInToken) => fetch(
    `${baseHttpApi}/api/remove-favorite/${productId}/?format=json`,
    {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Token ${loggedInToken}`,
        },
    },
);

export const addFavoriteApi = (productId, loggedInToken) => fetch(
    `${baseHttpApi}/api/add-favorite/${productId}/?format=json`,
    {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Token ${loggedInToken}`,
        },
    },
);

export const fetchCategories = () => fetch(`${baseHttpApi}/api/product-categories/?format=json`)
    .then((response) => response.json())
    .then((json) => json);

export const fetchProducts = (
    keyword,
    distance,
    userLongitude,
    userLatitude,
) => fetch(
    `${baseHttpApi}/api/search-products/${keyword}/?format=json`,
)
    .then((response) => response.json())
    .then((json) => json.map((product) => mapProduct(product, userLongitude, userLatitude)))
    .then((json) => json.filter((item) => item.minDistance < distance));

export const fetchProductByIdApi = (id, userLongitude, userLatitude) => fetch(`${baseHttpApi}/api/product/${id}/?format=json`)
    .then((response) => response.json())
    .then((json) => json.map((product) => mapProduct(product, userLongitude, userLatitude)));

export const fetchAvailableSizes = (productId, sellerId, categoryType) => fetch(
    `${baseHttpApi
    }/api/available-sizes/${
        productId
    }/${
        categoryType
    }/${
        sellerId
    }/?format=json`,
)
    .then((response) => response.json());

export const fetchProductDetails = (id, categoryType) => fetch(
    `${baseHttpApi
    }/api/product-details/${
        id
    }/${
        categoryType
    }/?format=json`,
)
    .then((response) => response.json())
    .then((json) => json.map((x) => mapProductDetails(x, categoryType)))
    .then((json) => Object.values(json)[0]);

export const reservationApi = (
    loggedInToken,
    productId,
    filters,
    quantity,
    paidWithMoney,
    sellerId,
) => fetch(
    `${baseHttpApi
    }/api/product-reservation/${
        productId
    }/${
        filters
    }/?format=json`,
    {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Token ${loggedInToken}`,
        },
        body: JSON.stringify({
            quantity,
            paid_with_money: paidWithMoney,
            company: sellerId,
        }),
    },
)
    .then((response) => response.json().then((data) => ({
        status: response.status,
        message: data.message,
    })));
