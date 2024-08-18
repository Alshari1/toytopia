
const UseSubmit = (value) => {

    const handleSubmit = (event, id) => {
        event.preventDefault()
        console.log('clicked')
        const form = event.target;

        // product information
        const prod_name = form.prod_name.value;
        const prod_sku = form.prod_sku.value;
        const prod_category = form.prod_category.value;
        const prod_price = form.prod_price.value;
        const prod_stock = form.prod_stock.value;
        const prod_brand = form.prod_brand.value;

        const ProductInformation = { prod_name, prod_sku, prod_category, prod_price, prod_stock, prod_brand }
        // description
        const prod_title = form.prod_title.value;
        const prod_description = form.prod_description.value;

        // discount

        const prod_discount = form.pord_discount.value;

        const discount_validUntil = form.discount_validUntil.value;
        const now = moment(); // Current time
        const futureDate = moment(discount_validUntil); // Future date from form input
        const secondsFromNow = futureDate.diff(now, 'seconds'); // Difference in seconds

        const discount_info = { prod_discount, discount_validUntil: secondsFromNow }

        // tags
        const tagsString = form.prod_tags.value;
        const prod_tags = processTags(tagsString);

        // images

        const variant_size = form.variant_size.value;
        const variant_color = form.variant_color.value;
        const variant_price = form.variant_price.value;
        const variant_stock = form.variant_stock.value;

        const varients = [{ size: variant_size, color: variant_color, price: variant_price, stock: variant_stock }]

        // shipping info




        const prod_weight = form.prod_weight.value;
        const prod_dimension = form.prod_dimension.value;
        const prod_ship_cost = form.prod_ship_cost.value;
        const prod_handle_time = form.prod_handle_time.value;

        const shippingInfo = { prod_weight, prod_dimension, prod_ship_cost, prod_handle_time }

        // supplier details
        const supplier_name = form.supplier_name.value;
        const supplier_contact = form.supplier_contact.value;
        const barcode = form.barcode.value;
        const release_date = form.release_date.value;

        const supplierInfo = { supplier_name, supplier_contact, barcode, release_date }


        const data = { ProductInformation, prod_description, prod_title, discount_info, prod_tags, prod_img: imageUrls, varients, shippingInfo, supplierInfo }

        // console.log(data)

        try {
            if (value === 'update') {
                console.log(`updated data${id}`, data)

            } else {
                console.log('submited data', data)
                // axios.post('http://localhost:5000/products', data)
                //     .then(res => {
                //         if (res.data.insertedId) {
                //             alert('inserted successfully')
                //         } else {
                //             alert('something wrong')
                //         }
                //     })
                //     .catch(err => console.log(err))
            }
        } catch (error) {
            alert('something went wrong')
        }
    }
    return handleSubmit;
}

export default UseSubmit
