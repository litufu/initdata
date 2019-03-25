"use strict";
// import '@babel/polyfill';
import Papa from 'papaparse'
import fs from 'fs'
import { prisma } from '../generated/prisma-client'

const provinceFile = '../data/province.csv'
const cityFile = '../data/city.csv'
const areaFile = '../data/area.csv'
const streetFile = '../data/street.csv'
const villageFile = '../data/village.csv'
const majorFile = '../data/major.csv'
const universityFile = '../data/university.csv'
const stationFile = '../data/station.csv'



const readFile = function (fileName, encode) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, encode, function (error, data) {
      if (error) return reject(error);
      resolve(data);
    });
  });
};

const parseCsv = function (data) {
  return new Promise(function (resolve, reject) {
    Papa.parse(data, {
      complete: function (results) {
        resolve(results);
      }
    });
  });
};

// 添加职位信息

async function addStation() {
  try {
    const file = await readFile(stationFile, 'utf8')
    const results = await parseCsv(file)
    for (const value of results.data) {
      try {
        const newStation = await prisma
          .createStation({
            code: value[0],
            name: value[1],
          })
        console.log(newStation);
      } catch (err) {
        console.log(err)
        continue
      }
    }
  } catch (err) {
    console.log(err);
  }
}
// 添加大学信息
async function addUniversity() {
  try {
    const file = await readFile(universityFile, 'utf8')
    const results = await parseCsv(file)
    for (let value of results.data) {
      try {
        const newUniversity = await prisma
          .createUniversity({
            name: value[0],
            education: value[1],
            department: value[2],
            location: value[3],
            desc: value[4],
          })
        console.log(newUniversity);
      } catch (err) {
        console.log(err)
        continue
      }
    }
  } catch (err) {
    console.log(err);
  }
}
// 添加专业信息
async function addMajor() {
  try {
    const file = await readFile(majorFile, 'utf8')
    const results = await parseCsv(file)
    for (let value of results.data) {
      try {
        const newMajor = await prisma
          .createMajor({
            name: value[1],
            category: value[0],
            education: value[2]
          })
        console.log(newMajor);
      } catch (err) {
        console.log(err)
        continue
      }
    }
  } catch (err) {
    console.log(err);
  }
}
// 添加省份信息
async function addProvince() {
  try {
    const file = await readFile(provinceFile, 'utf8')
    const results = await parseCsv(file)
    for (let value of results.data) {
      try {
        const newProvince = await prisma
          .createProvince({
            code: value[0],
            name: value[1],
          })
        console.log(newProvince);
      } catch (err) {
        console.log(err)
        continue
      }
    }

  } catch (err) {
    console.log(err);
  }
}

// 添加市一级信息
async function addCity() {
  try {
    const file = await readFile(cityFile, 'utf8')
    const results = await parseCsv(file)
    for (let value of results.data) {
      try {
        const newCity = await prisma
          .createCity({
            code: value[0],
            name: value[1],
            province: { connect: { code: value[2] } }
          })
        console.log(newCity);
      } catch (err) {
        console.log(err)
        continue
      }
    }
  } catch (err) {
    console.log(err);
  }
}

// 添加区一级信息
async function addArea() {
  try {
    const file = await readFile(areaFile, 'utf8')
    const results = await parseCsv(file)
    for (let value of results.data) {
      try {
        const newArea = await prisma
          .createArea({
            code: value[0],
            name: value[1],
            city: { connect: { code: value[2] } }
          })
        console.log(newArea);
      } catch (err) {
        console.log(err)
        continue
      }
    }
  } catch (err) {
    console.log(err);
  }
}

// 添加区一级信息
async function addStreet() {
  try {
    const file = await readFile(streetFile, 'utf8')
    const results = await parseCsv(file)
    for (let value of results.data) {
      console.log(value[0])
      console.log(value[1])
      console.log(value[2])
      try {
        const newStreet = await prisma
          .createStreet({
            code: value[0],
            name: value[1],
            Area: { connect: { code: value[2] } }
          })
        console.log(newStreet);
      } catch (err) {
        console.log(err)
        continue
      }
    }
  } catch (err) {
    console.log(err);
  }
}

// 添加村一级信息
async function addVillage() {
  try {
    const file = await readFile(villageFile, 'utf8')
    const results = await parseCsv(file)
    for (let value of results.data) {
      try {
        const newVillage = await prisma
          .createVillage({
            code: value[0],
            name: value[1],
            street: { connect: { code: value[2] } }
          })
        console.log(newVillage);
      } catch (err) {
        console.log(err)
        continue
      }
    }
  } catch (err) {
    console.log(err);
  }
}

async function addProducts() {
  try {
    const products = [{
      subject: "2019年高考志愿填报会员",
      info: "有效期至2019年9月1日",
      kind: "REGSTATUS",
    },
    {
      subject: "同城热恋会员",
      info: "购买日起一年内有效,购买数量等于会员等级",
      kind: "LOVE",
    },
    {
      subject: "寻找创业合伙人会员",
      info: "购买日一年内有效",
      kind: "PARTNER",
    },
    ]
    for (const product of products) {
      try {
        const newProduct = await prisma
          .createProduct({
            subject: product.subject,
            info: product.info,
            kind: product.kind
          })
        console.log(newProduct);
      } catch (err) {
        console.log(err)
        continue
      }
    }
  } catch (err) {
    console.log(err);
  }
}




// addProvince()
// addCity()
// addArea()
// addStreet()
addVillage()
// addMajor()
// addUniversity()
// addStation()
// addProducts()