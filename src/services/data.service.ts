// import { Request } from 'express';

import dbconnection from '../db/db.connnection';
export default class nodeDBService {

    connection = dbconnection;

    constructor() {
        this.connection.connect(function (err: any) {
            if (!err) {
                console.log("Database is connected ... nn");
            } else {
                console.log("Error connecting database ... nn");
            }
        });
    }



    addProductData = (reqData: any) => {
        // const emp_name = req.body.emp_name, emp_salary = req.body.emp_salary, emp_address = req.body.emp_address;
        return new Promise((resolve, reject) => {
            var sql = 'INSERT INTO node_db.product (product_name,product_price,product_desc) VALUES (?,?,?)'
            this.connection.query(sql, [reqData.product_name, reqData.product_price, reqData.product_desc], (err, res) => {
                if (err) {
                    console.log(err)
                    reject({ status: false, error: err })
                }
                else {
                    console.log("insert response", res);
                    resolve({ status: true, data: res })
                }
            });

        })
    }

    getProductData = async () => {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM node_db.product', (err, rows) => {
                if (err) {
                    reject({ status: false, error: err })
                }
                else {
                    console.log("insert response", rows);
                    resolve({ status: true, data: rows })
                }
            })
        })
    }

    getProductByID = async (productID: any) => {
        return new Promise((resolve, reject) => {

            var sql = 'SELECT * FROM node_db.product WHERE product_id=?'
            this.connection.query(sql, [productID], (err, rows) => {
                if (err) {
                    reject({ status: false, error: err })
                }
                else {
                    console.log("insert response", rows);
                    resolve({ status: true, data: rows })
                }
            })
        })
    }


    updateProductData = async (updateReq: any) => {

        const updateData = updateReq.body;

        return new Promise((resolve, reject) => {
            var sql = 'UPDATE node_db.product SET product_name=?, product_price=?, product_desc=? WHERE product_id=?'
            console.log("sql", sql)
            this.connection.query(sql, [updateData.product_name, updateData.product_price, updateData.product_desc, updateReq.params.id], (err, res) => {
                console.log("sql", sql)
                if (err) {
                    reject({ status: false, error: err })
                }
                else {
                    console.log("insert response", res);
                    resolve({ status: true, data: res })
                }
            });

        })

    };

    deleteProductData = async (deleteID: any) => {
        return new Promise((resolve, reject) => {
            this.connection.query(
                'DELETE FROM node_db.product where product_id = ?', [deleteID], (err, result) => {
                    console.log("Deleted row");
                    if (err) {
                        reject({ status: false, error: err })
                    }
                    else {
                        console.log("Deleted Sucessfully", result);
                        resolve({ status: true, data: result })
                    }
                });
        })
    }

    
    unionProductData = async () => {
        console.log("here")
        return new Promise((resolve, reject) => {
            const sql = '((SELECT  product.product_id , product.product_price FROM product) UNION (SELECT user.email, user.user_name FROM user))';
            this.connection.query(
                sql,  (err, result) => {
                    console.log("Deleted row");
                    if (err) {
                        reject({ status: false, error: err })
                    }
                    else {
                        console.log("insert response", result);
                        resolve({ status: true, data: result })
                    }
                });
        })
    }
}

