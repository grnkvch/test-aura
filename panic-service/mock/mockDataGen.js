const path = require('path')
const fs = require('fs')
const uuid = require('uuid')

function randomFloat (minimum, maximum, precision) {
  minimum = minimum === undefined ? 0 : minimum
  maximum = maximum === undefined ? 9007199254740992 : maximum
  precision = precision === undefined ? 0 : precision

  const random = Math.random() * (maximum - minimum) + minimum

  return Number(random.toFixed(precision))
}

function RandomLoc(){
  return [randomFloat(27,28, 6), randomFloat(53,54, 6)]
}

const pathNamesFile = path.join(__dirname, './randomNames.txt')
const pathCompanyFile = path.join(__dirname, './randomCompany.txt')
const pathGuardFile = path.join(__dirname, './randomGuradCompany.txt')
const pathToWrite = path.join(__dirname, './otput2.sql')

const namesRaw = fs.readFileSync(pathNamesFile).toString()
const namesArray = namesRaw.split('\n').map((i)=>i.split(' '))

const companyRaw = fs.readFileSync(pathCompanyFile).toString()
const companyArray = companyRaw.split('\n')

const guardRaw = fs.readFileSync(pathGuardFile).toString()
const guardArray = guardRaw.split('\n')

let GURADS_COUNT = 0

const usersUuid = []
const guardsUuid = []

const a = namesArray.reduce((acc, i, index)=>{
  if(!index){
    acc.admin.push(`('${uuid.v4()}','${i[0]}', '${i[1]}', NULL, 'admin')`)
    return acc
  }
  if(index < 75){
    const id = uuid.v4()
    usersUuid.push(id)
    acc.clients.push(`('${id}','${i[0]}', '${i[1]}', '${companyArray[index]}', 'client')`)
    return acc
  }
  GURADS_COUNT += 1
  const id = uuid.v4()
  guardsUuid.push(id)
  console.log()
  acc.guards[id] = (`('${id}','${i[0]}', '${i[1]}', '${guardArray[randomFloat(0, guardArray.length - 1, 0)]}', 'guard')`)
  return acc
}, {
  admin: [],
  guards: {},
  clients: []
})

const st = `INSERT INTO users (id, name, surname, organization, user_role) values
${a.admin[0]},
${a.clients.map(i=>i).join(',\n')},
${Object.values(a.guards).map(i=>i).join(',\n')};

insert into guards (id, user_id, geolocation, available) values
${Object.keys(a.guards).map((i, index )=>(`(${index+1}, '${i}', 'POINT(${RandomLoc()[0]+' '+ RandomLoc()[1]})', ${!!randomFloat(0,1,0)})`)).join(',\n')};

INSERT INTO panics (user_id , geolocation, guard_id, resolved_at) VALUES
${Array(50).fill('').map(()=>{
    const resolved = !!randomFloat(0,1,0)
    return `('${usersUuid[randomFloat(0, usersUuid.length - 1), 0]}', 'POINT(${RandomLoc()[0]+' '+ RandomLoc()[1]})', ${resolved ? randomFloat(0,GURADS_COUNT,0) : null }, ${resolved ? `'${new Date().toISOString()}'` : null })`}).join(',\n')};`


fs.writeFileSync(pathToWrite, st)
