import { connect, Schema, model, disconnect } from 'mongoose'

async function main() {
    try {
        await connect('mongodb://127.0.0.1:27017', {
            dbName: 'mongoTest2',
            user: 'root',
            pass: '123456'
        })

        //  新增
        const ProductSchema = new Schema<{ title: String, desc: String, tags: String[], price: Number }>({
            title: { type: String },
            desc: { type: String },
            tags: { type: [String] },
            price: { type: Number }
        }, { collection: 'products' })
        const ProductModel = model('Product', ProductSchema)
        await ProductModel.create({ title: '华为 P60-PRO-MAX', desc: '高端手机', price: '8999', date: '2023-03' })
        console.log(await ProductModel.find({}))

        //  查询
        const UserSchema = new Schema({
            name: { type: String },
            age: { type: Number },
            hobbies: { type: Array },
            teamId: { type: Schema.Types.ObjectId, ref: 'teams' }
        }, { collection: 'users' })

        const UserModel = model('User', UserSchema)
        console.log(await UserModel.find({ teamId: { $exists: true } }))

    } catch (error) {
        console.error(error)
    } finally {
        disconnect()
    }
}

main()