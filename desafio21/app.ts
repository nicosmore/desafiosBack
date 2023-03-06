import { Application, Router} from "https://deno.land/x/oak/mod.ts";

const router = new Router();

router.get("/", async(ctx) => {
    const file = await Deno.open("./form.html", { read: true });
    ctx.response.body = file.readable;
});

router.post("/", async (ctx) => {
    const color = await ctx.request.body;
    console.log(color);
    return ctx.response.redirect('/') 
});


const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port: 8080 });

