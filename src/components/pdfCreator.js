import React, { Component } from "react";
import { Text, TouchableHighlight, View, Linking } from "react-native";
import FileViewer from "react-native-file-viewer";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import RNFS from "react-native-fs";

export default class pdfCreator extends Component {
  async createPDF() {
    let options = {
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <title>Title</title>
          <link href="https://fonts.googleapis.com/css?family=Roboto:400,500i,700" rel="stylesheet">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
              body{
                  font-family: Roboto, sans-serif;
                  color: #505a6b;
                  font-size: 0.9rem;
              }
      
              .logo-font{
                  color: #505a6b;
              }
              table{
                  width: 100%;
                  border-collapse: collapse;
                  text-align: center;
              }
      
              table, th, td {
                  border: 1px solid #dcdcdc;
              }
      
              thead{
                  font-weight: 600
              ;
              }
              .main-wrapper{
                  max-width: 500px;
                  margin: 0 auto;
                  padding: 2rem;
                  background: #f0f0f0;
              }
              .main-inner{
                  border: 1px solid #969696;
                  background-color: #fff;
                  padding: 1rem;
              }
              .clearfix{
                  overflow: auto;
              }
      
              .clearfix::after{
                  content: "";
                  clear: both;
                  display: table;
              }
      
              .row{
      
                  padding: 1rem;
              }
      
              .col-md-6{
                  width: 50%;
                  display: inline-block;
                  float: left;
              }
              .text-right{
                  text-align: right;
              }
              ul{
                  margin-top: 8px;
                  list-style-type: none;
                  padding: 0;
              }
              ul li{
                  padding: 0.18rem 0;
              }
      
              a{
                  background-color: #006837;
                  color: #fff;
                  display: block;
                  text-align: center;
                  margin-top: 3rem;
                  padding: 0.67rem;
                  border: 1px solid #00371b;
                  border-radius: 5px;
                  text-decoration: none;
              }
          </style>
      </head>
      
      <body>
      
      <div class="main-wrapper">
          <div class="row clearfix">
              <div class="col-md-6">
                  <b class="logo-font">Bills.pk</b>
                  <ul>
                      <li><b>Reference No.</b>12345 </li>
                  </ul>
              </div>
              <div class="col-md-6 text-right">
                  <b>Billed To:</b>
                  <ul>
                      <li>Muhammad Usman</li>
                      <li>Amount Due: 45,000</li>
                  </ul>
              </div>
          </div>
      
              <table>
                  <thead>
                  <td>Name</td>
                  <td>Institution</td>
                  <td>Amount Paid</td>
                  </thead>
                  <tbody>
                  <tr>
                      <td>
                          Muhammad Usman
                      </td>
                      <td>
                          University Of Lahore
                      </td>
                      <td>
                          20,000 Rs
                      </td>
                  </tr>
                  </tbody>
              </table>
          <a href="">Thank you for working with us! </a>
      </div>
      
      </body>
      </html>`,
      fileName: "test",
      directory: RNFS.DocumentDirectoryPath.toString()
    };

    let file = await RNHTMLtoPDF.convert(options);
    // console.log(file.filePath);
    console.log(file.filePath);
    // Linking.openURL(file.filePath);
    FileViewer.open(file.filePath);
  }

  render() {
    return (
      <View>
        <TouchableHighlight onPress={this.createPDF} style={{ paddingTop: 50 }}>
          <Text>Create PDF</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
