import React, { useState } from "react";
import axios from "axios";

const AddProductForm = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setProductData({ ...productData, image: files[0] });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", productData.price);
    formData.append("image", productData.image);

    try {
      const response = await axios.post("http://localhost:5000/api/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Товар успешно создан!");
      console.log(response.data);
    } catch (error) {
      console.error("Ошибка при создании товара:", error);
      alert("Ошибка при создании товара");
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
       <div>
        <input type="file" name="image" onChange={handleChange} required />
      </div>
      <div>
        <input type="text" name="name" placeholder="Введите название товара"
        value={productData.name} onChange={handleChange} required />
      </div>

      <div>
        <textarea name="description"  placeholder="Введите описание товара"
        value={productData.description} onChange={handleChange}  required />
      </div>

      <div>
        <input type="number" name="price" placeholder="Введите цену товара"
           onChange={handleChange} value={productData.price} required />
      </div>
      <button type="submit">Создать товар</button>
    </form>
  );
};

export default AddProductForm;