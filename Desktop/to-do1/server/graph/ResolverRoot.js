const HealthResolver = require('./resolvers/HealthResolver');
const CreateUser=require("./resolvers/CreateUser");
const UserService = require("../services/UserService");
const WithAuthResolver = require('./resolvers/WithAuthResolver');
const MutationWithAuthResolver = require('./resolvers/MutationWithAuthResolver');
const {enc, dec} = require('../bootloader/security/StatelessMiddleware');
const validator=require("validator");

/**
 * The resolver root class
 * */
exports = module.exports = class ResolverRoot {

    async health() {
        return new HealthResolver();
    }

    async withAuth({token}, ctx) {
        //todo make work
        const user = await UserService.authenticate(ctx);
        if (!user) {
            ctx.forceResponseCode = 401;
            throw new Error('Invalid Auth Provided. Token not valid.');
        }
        return new WithAuthResolver(user, token);
    }

    async mutationWithAuth({token}, ctx) {
        const user = await UserService.authenticate(ctx);
        if (!user) {
            ctx.forceResponseCode = 401;
            throw new Error('Invalid Auth Provided. Token not Valid.');
        }
        return new MutationWithAuthResolver(user, token);
    }

    async createUser({userInput},ctx){
        const {name,email,password}=userInput;
        if(!validator.isEmail(email)){
            throw new Error("Invalid Email Address");
        }
        if(validator.isEmpty(password)){
            throw new Error("Password Field is empty");
        }
        const userObject=new CreateUser(name,email,password);

        const newUser=await userObject.addUser();
        ctx.loginUser(newUser._doc);
        return {...newUser._doc};
    }

    async loginUser({userInput},ctx){
        const {email,password}=userInput;
        if(!validator.isEmail(email)){
            throw new Error("Invalid Email Address");
        }
        if(validator.isEmpty(password)){
            throw new Error("Password Field is empty");
        }
        const user=await UserService.authenticate(email,password,ctx);
        if(!user){
            throw new Error('Invalid Auth Provided. Token not Valid.');
        }
        return user;
    }
    
 

    async createTask({name,assignedTo,list_id}){
        if(validator.isEmpty(name)){
            throw new Error("Task Name is Empty");
        }
        const Task=await TaskService.create(name,assignedTo,list_id);
        return Task;
    }

   
    async Tasks(){
        const Tasks= await TaskService.find();
        return Tasks;
    }

    async constant({value}) {
        return value;
    }

    async enumOptions({name}) {
        try {
            const enm = require('../util/enums/' + name);
            return enm.values.map(v => ({
                key: v,
                val: v
            }));
        } catch (c) {
            log.error(c);
            throw new Error('Unknown or bad Enum');
        }
    }

    static get bean() {
        if (!ResolverRoot.instance) {
            ResolverRoot.instance = new ResolverRoot();
        }
        return ResolverRoot.instance;
    }
};
