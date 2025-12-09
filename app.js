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
            // shippment.className = 'shippmentPrice';
            shippment.innerText = 'Siuntimo kaina: ' + meta.shippingPrice + ' Eur';
            shipping.append(shippment);

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

fetch('https://in3.dev/inv/')
    .then((res) => res.json())
    .then((meta) => {
        console.log(meta);
        sasktaitosNr(meta);
        pirkejasInfo(meta);
        pardavejasInfo(meta);
        items(meta);
    });
