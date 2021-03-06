const React = require('react');

const Clock         = require('Clock');
const CountdownForm = require('CountdownForm');
const Controls      = require('Controls');

const Countdown = React.createClass({
    getInitialState : function () {
        return {
            count  : 0,
            status : 'stopped',
        };
    },

    handleSetCountdown : function (seconds) {
        this.setState({
            count  : seconds,
            status : 'started',
        });
    },

    handleStatusChange : function (status) {
        this.setState({
            status : status,
        });
    },

    startTimer : function () {
        this.timer = setInterval(() => {
            const newCount = this.state.count - 1;

            this.setState({
                count : newCount >= 0 ? newCount : 0,
            });

            if (newCount === 0) {
                this.setState({
                    status : 'stopped',
                });
            }
        }, 1000);
    },

    componentWillMount : function () {

    },

    componentDidMount : function () {

    },

    componentWillUnmount : function () {
        clearInterval(this.timer);
        this.timer = undefined;
    },

    componentWillUpdate : function () {

    },

    componentDidUpdate : function (prevProps, prevState) {
        if (this.state.status !== prevState.status) {
            switch (this.state.status) {
                case 'started': {
                    this.startTimer();
                    break;
                }

                case 'stopped': {
                    this.setState({
                        count : 0,
                    });
                }

                case 'paused': {
                    clearInterval(this.timer);
                    this.timer = undefined;
                    break;
                }
            }
        }
    },

    render : function () {
        const {count, status} = this.state;

        const renderControlArea = () => {
            if (status !== 'stopped') {
                return (
                    <Controls status={status} onStatusChange={this.handleStatusChange}/>
                );
            } else {
                return (
                    <CountdownForm onSetCountdown={this.handleSetCountdown}/>
                );
            }
        };

        return (
            <div>
                <h1 className="page-title">
                    Countdown App
                </h1>
                <Clock totalSeconds={count}/>
                { renderControlArea() }
            </div>
        );
    },
});

module.exports = Countdown;
