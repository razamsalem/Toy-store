import { ToyChart } from "../cmps/ToyChart";

export function Home() {

    return <section className="home">
        <h1>Home sweet home</h1>
        <div className="card-outside">
            <span className="title">At ToyJoy you will find a variety of toys of all kinds!</span>
            <div className="card">
                <div className="app-info-display">
                    <ToyChart />
                </div>
            </div>
        </div>
    </section>
}