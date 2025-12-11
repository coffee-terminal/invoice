const saskNr = document.querySelector('.SaskaitosNr');
const saskTerm = document.querySelector('.dokTerminas');
const saskData = document.querySelector('.SaskaitosData');
const buyer = document.querySelector('.buyer');
const seller = document.querySelector('.seller');
const itemsList = document.querySelector('.items');
const totalPrice = document.querySelector('.totalPrice');
const shipping = document.querySelector('.shippingPrice');

let itemsSumaPVM = 0;
let itemsSumaBePVM = 0;

const sasktaitosNr = (meta) => {
    const li = document.createElement('span');
    const li2 = document.createElement('span');
    const li3 = document.createElement('span');
    const saskaitosNumber = meta.number; // paimu iš struktūros number
    const saskaitosDate = meta.date; // paimu iš struktūros number
    const saskaitosDueDate = meta.due_date; // paimu iš struktūros number
    li.innerText = 'PVM SĄSKAITA FAKTŪRA Nr. ' + saskaitosNumber;
    li2.innerText = saskaitosDate;
    li3.innerText = saskaitosDueDate;
    saskNr.append(li);
    saskData.append(li2);
    saskTerm.append(li3);
};

const pirkejasInfo = (meta) => {
    const li = document.createElement('li');
    const buyerName = meta.company.buyer.name;
    const buyerAdress = meta.company.buyer.address;
    const buyerCode = meta.company.buyer.code;
    const buyerVat = meta.company.buyer.vat;
    const buyerPhone = meta.company.buyer.phone;
    const buyerEmail = meta.company.buyer.email;

    li.innerText =
        'Vardas: ' +
        buyerName +
        '\nAdresas: ' +
        buyerAdress +
        '\nĮmonės kodas: ' +
        buyerCode +
        '\nMokėtojo kodas: ' +
        buyerVat +
        '\nMobilus telefonas: ' +
        buyerPhone +
        '\nEl. paštas: ' +
        buyerEmail;
    buyer.append(li);
};
const pardavejasInfo = (meta) => {
    const li = document.createElement('li');
    const sellerName = meta.company.seller.name;
    const sellerAdress = meta.company.seller.address;
    const sellerCode = meta.company.seller.code;
    const sellerVat = meta.company.seller.vat;
    const sellerPhone = meta.company.seller.phone;
    const sellerEmail = meta.company.seller.email;

    li.innerText =
        'Vardas: ' +
        sellerName +
        '\nAdresas: ' +
        sellerAdress +
        '\nĮmonės kodas: ' +
        sellerCode +
        '\nMokėtojo kodas: ' +
        sellerVat +
        '\nMobilus telefonas: ' +
        sellerPhone +
        '\nEl. paštas: ' +
        sellerEmail;
    seller.append(li);
};
const items = (meta) => {
    meta.items.forEach((data, i) => {
        const item = document.createElement('div');
        item.className = 'item';
        itemsList.append(item);
        itemInside = document.querySelector('.item:last-child');

        const divItemNr = document.createElement('div');
        divItemNr.className = 'itemNr';
        divItemNr.innerText = ++i + '.';
        itemInside.append(divItemNr);

        const divDesc = document.createElement('div');
        divDesc.className = 'itemDesc';
        const itemDesc0 = data.description;
        divDesc.innerText = itemDesc0;
        itemInside.append(divDesc);

        const divPrice = document.createElement('div');
        divPrice.className = 'itemPrice';
        const itemPrice = data.price;
        divPrice.innerText = itemPrice;
        itemInside.append(divPrice);

        const divQuantity = document.createElement('div');
        divQuantity.className = 'itemQuantity';
        const itemQuantity = data.quantity;
        divQuantity.innerText = itemQuantity;
        itemInside.append(divQuantity);

        const divDiscountType = document.createElement('div');
        divDiscountType.className = 'itemDiscountType';
        let itemDiscountType = data.discount.type;

        const divDiscountValue = document.createElement('div');
        divDiscountValue.className = 'itemDiscountValue';
        let itemDiscountValue = data.discount.value;
        let itemItemSuma = 0;
        if (itemDiscountType != undefined) {
            if (itemDiscountType == 'fixed') {
                itemItemSuma = itemPrice - itemDiscountValue;
                itemDiscountValue = -itemDiscountValue * itemQuantity;
            } else if (itemDiscountType == 'percentage') {
                itemItemSuma = itemPrice - (itemPrice * itemDiscountValue) / 100;
                itemDiscountValue = -((itemPrice * itemQuantity * itemDiscountValue) / 100).toFixed(2) + '(' + itemDiscountValue + '%)';
            }
        } else {
            itemItemSuma = itemPrice;
            itemDiscountValue = '';
        }
        divDiscountValue.innerText = itemDiscountValue;
        itemInside.append(divDiscountValue);

        const divItemSuma = document.createElement('div');
        divItemSuma.className = 'itemBePVM';
        divItemSuma.innerText = (itemItemSuma * itemQuantity).toFixed(2);
        itemInside.append(divItemSuma);

        const divItemSuPvm = document.createElement('div');
        divItemSuPvm.className = 'itemSuPVM';
        divItemSuPvm.innerText = (itemItemSuma * itemQuantity * 1.21).toFixed(2);
        itemInside.append(divItemSuPvm);

        // itemsSumaPVM = itemsSumaPVM + itemItemSuma * 1.21;
        itemsSumaBePVM = itemsSumaBePVM + itemItemSuma * itemQuantity;

        // console.log(meta.items.length);
        // console.log(i);

        // console.log(itemsSumaPVM);
        // console.log(itemsSumaBePVM);
        if (meta.items.length == i) {
            const shippment = document.createElement('div');
            shippment.className = 'shippmentPrice';
            shippment.innerText = meta.shippingPrice.toFixed(2) + ' Eur';

            totalPrice.append(shippment);

            const itemsSuma = document.createElement('div');
            itemsSuma.className = 'itemSuma';
            itemsSuma.innerText =
                itemsSumaBePVM.toFixed(2) +
                ' Eur' +
                '\n' +
                (itemsSumaBePVM + meta.shippingPrice).toFixed(2) +
                ' Eur' +
                '\n' +
                ((itemsSumaBePVM + meta.shippingPrice) * 0.21).toFixed(2) +
                ' Eur';
            totalPrice.append(itemsSuma);

            const itemsSumaSuPVM = document.createElement('div');
            itemsSumaSuPVM.className = 'itemSumaSuPVM';
            itemsSumaSuPVM.innerText = (itemsSumaBePVM * 1.21).toFixed(2) + ' Eur';
            totalPrice.append(itemsSumaSuPVM);
        }
    });
};

const numbersToWords = {
    0: 'nulis',
    1: 'vienas',
    2: 'du',
    3: 'trys',
    4: 'keturi',
    5: 'penki',
    6: 'šeši',
    7: 'septyni',
    8: 'aštuoni',
    9: 'devyni',
    10: 'dešimt',
    11: 'vienuolika',
    12: 'dvylika',
    13: 'trylika',
    14: 'keturiolika',
    15: 'penkiolika',
    16: 'šešiolika',
    17: 'septyniolika',
    18: 'aštuoniolika',
    19: 'devyniolika',
    20: 'dvidešimt',
    30: 'trisdešimt',
    40: 'keturiasdešimt',
    50: 'penkiasdešimt',
    60: 'šešiasdešimt',
    70: 'septyniasdešimt',
    80: 'aštuoniasdešimt',
    90: 'devyniasdešimt',
};

const skaciusZodziu = (number) => {
    saskaitosVisaSuma = document.querySelector('.itemSumaSuPVM');
    pastaba2text = document.querySelector('.pastaba2');

    number = parseInt(saskaitosVisaSuma.innerHTML);
    centai = parseFloat(saskaitosVisaSuma.innerHTML).toFixed(2);
    // console.log(centai.slice(-2));
    if (number in numbersToWords) return numbersToWords[number];

    let words = '';
    if (number >= 21000) {
        words += numbersToWords[Math.floor(number / 10000) * 10] + ' ';

        words += numbersToWords[Math.floor((number / 1000) % 10)] + ' tūkst. ';

        number %= 1000;
    } else {
        if (number >= 10000 && number < 21000) {
            words += numbersToWords[Math.floor(number / 1000)] + ' tūkstančių ';

            number %= 1000;
        } else {
            if (number >= 1000 && number < 2000) {
                words += 'tūkstantis ';

                number %= 1000;
            } else if (number > 1000) {
                words += numbersToWords[Math.floor(number / 1000)] + ' tūkstančiai ';

                number %= 1000;
            }
        }
    }

    if (number >= 100 && number < 200) {
        words += 'šimtas';

        number %= 100;
    } else if (number >= 200) {
        words += numbersToWords[Math.floor(number / 100)] + ' šimtai';

        number %= 100;
    }

    if (number > 0) {
        if (words !== '') words += ' ';

        if (number < 20) words += numbersToWords[number] + ' eurai ' + centai.slice(-2) + ' cent.';
        else {
            words += numbersToWords[Math.floor(number / 10) * 10];

            if (number % 10 > 0) {
                words += ' ' + numbersToWords[number % 10] + ' eurai ' + centai.slice(-2) + ' cent.';
            } else {
                words += ' eurai ' + centai.slice(-2) + ' cent.';
            }
        }
    }

    return (pastaba2text.innerHTML = `<b>Iš viso suma su PVM: </b> ${words}`);
};

fetch('https://in3.dev/inv/')
    .then((res) => res.json())
    .then((meta) => {
        console.log(meta);
        sasktaitosNr(meta);
        pirkejasInfo(meta);
        pardavejasInfo(meta);
        items(meta);
        console.log(skaciusZodziu(200));
    });
