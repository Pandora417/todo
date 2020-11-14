// 可在jsx里写HTML，也可以写js
import '../assets/styles/footer.styl';
export default {
    data() {
        return {
            'author': 'Pandora'
        };
    },
    render() {
        return (
            <footer id="footer">
                <span>Written by {this.author}</span>
            </footer>
        );
    }
};
