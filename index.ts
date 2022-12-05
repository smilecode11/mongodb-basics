import { FindOptions, MongoClient, ObjectId, UpdateFilter } from 'mongodb'

const url = `mongodb://root:123456@127.0.0.1:27017/`
const client = new MongoClient(url)

async function run() {
    try {
        await client.connect()
        const db = client.db('mongoTest2')
        const collectRes = await db.command({ ping: 1 })
        console.log(collectRes)
        /** 数据插入 */
        const userCollection = db.collection('users')
        // const insertRes = await userCollection.insertOne({ name: 'smiling', age: 28, gender: 1 })
        // console.log(insertRes)
        // const inserManyRes = await userCollection.insertMany([{ name: '小白2', age: 27 }, { name: '尘心2', age: 27 }])
        // console.log(inserManyRes)

        /** 数据查找 */
        // const findOneRes = await userCollection.findOne({ name: 'smiling' })
        // console.log(findOneRes)
        //  查找多条, 使用 .toMany 返回数组, 注意数据量过大问题
        // const findManyRes = await userCollection.find({ name: 'smiling' }).toArray()
        // console.log(findManyRes)
        //  内置查询条件(操作符)
        // const operaRes = await userCollection.find({ age: { $lt: 20 } }).toArray()
        // console.log(operaRes)
        // const condition1 = {
        //     // $or: [  //  $or 或
        //     //     { age: { $gt: 30 } },
        //     //     { name: 'smiling' }
        //     // ]
        //     $and: [  //  $and 且
        //         { age: { $gt: 30 } },
        //         { name: 'smiling' }
        //     ]
        // }
        // const operaRes1 = await userCollection.find(condition1).toArray()
        // console.log(operaRes1)
        // const condition2 = {
        //     age: {
        //         $exists: true,  //  存在age 字段
        //         // $type: 'string'  //  字段类型是字符串
        //     }
        // }
        // const operaRes2 = await userCollection.find(condition2).toArray()
        // console.log(operaRes2)
        //  数据结果操作
        // const options: FindOptions = {
        //     limit: 10,   //  限制条数
        //     skip: 0,    //  跳过条数
        //     sort: { age: -1 },  //  排序: 1 或 -1
        //     projection: { _id: 0, name: 1, age: 1 }  //  隐藏 id 必须显式设置为 0
        // }
        // const operaRes3 = await userCollection.find({ age: { $exists: true } }, options).toArray()
        // console.log(operaRes3)
        //  模糊查询 $regex
        // const findRes = await userCollection.find({ name: { $exists: true, $regex: /尘心/g }, age: { $type: 'number', $gt: 20 } }).toArray()
        // console.log(findRes)

        /** 数据修改 */
        // const replaceRes = await userCollection.replaceOne({ name: 'smiling.' }, { hobbies: ['吃饭', '睡觉', '打豆豆'] })
        // console.log(replaceRes)

        // const updateFilter: UpdateFilter<{ name: string }> = {
        //     $set: {
        //         // name: 'smiling.'
        //         teamId: new ObjectId('638e3e3feb3feaefc8341147')
        //     },
        //     // $inc: { //  设置递增
        //     //     age: 1
        //     // }
        // }
        // const updateRes = await userCollection.updateOne({ name: '尘心2' }, updateFilter)
        // console.log(updateRes)

        /** 索引 */
        // const indexRes = await userCollection.find({ name: { $regex: /尘心/g }}).explain()
        // const indexRes = await userCollection.find({ _id: new ObjectId('638e36b293d08b50d599493b')}).explain()
        // console.log(indexRes)

        /** 聚合 */
        // const pipeLine = [
        //     { $match: { age: { $gt: 20 } } },    //  $match 过滤条件
        //     { $group: { _id: "$teamId", ageAvg: { $avg: '$age' }, count: { $sum: 1 } } }, //  依据 teamId 分组, 计算平均年龄, 数量统计
        // ]
        // const aggregateRes = await userCollection.aggregate(pipeLine).toArray()
        // console.log(aggregateRes)
        
        //  lookup: 连接查询
        const pipeLine1 = [
            { $match: { teamId: { $exists: true } } },
            {
                $lookup: {
                    from: 'teams',
                    localField: 'teamId',
                    foreignField: '_id',
                    as: 'newTeam'
                }
            }
        ]
        const aggregateRes = await userCollection.aggregate(pipeLine1).toArray()
        console.log(aggregateRes[0])

    } catch (error) {
        console.error(error)
    } finally {
        await client.close()
    }
}

run()
