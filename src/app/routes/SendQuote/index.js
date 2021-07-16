import React from 'react';
import ComposedTextField from 'form/form'
import InteractiveList from 'list/interactive/InteractiveList';
import 'index.css';
export default class InputForm extends React.Component {

    handleFinalized = name => e => {
        let changes = this.state;
        // let Finalized = Object.keys(changes.data).filter(quoteId => quoteId !== name);
        changes.data[name].type = 'unfinalized';
        // notFinalized.map(quoteId => changes.data[quoteId].type='finalized');
        this.setState(changes);
    }

    handleUnFinalized = name => e => {
        let changes = this.state;
        let notFinalized = Object.keys(changes.data).filter(quoteId => quoteId !== name);
        changes.data[name].type = 'finalized';
        notFinalized.map(quoteId => changes.data[quoteId].type='unfinalized');
        this.setState(changes);
    }

    state = {
        data: {
            123: {
                service1: true,
                service2: false,
                service3: true,
                service4: false,
                discountGiven: 100,
                presentValue: 200,
                totalAmount: 1000,
                TaxOnTotal: 50,
                netAmount: 500,
                type: 'unfinalized',
                quoteNo: 1,
            },
            456: {
                service1: true,
                service2: false,
                service3: true,
                service4: false,
                discountGiven: 100,
                presentValue: 900,
                totalAmount: 100,
                TaxOnTotal: 350,
                netAmount: 800,
                type: 'unfinalized',
                quoteNo: 2,
            }
        }
    }

    render() {

        return (
            <>
            <div className="app-wrapper">
<div className="row">
<div className="col-lg-6 col-md-6">
<ComposedTextField see={true} className="black" name="jayasoorya" number="9841348263" email="jayasooryadaniel@gmail.com" /> {/* form */}
</div>
<div className="col-lg-6 col-md-6">
    {/* quote entry field */}
<InteractiveList see={true} see1={false}
                    className="cardsInteractiveList"
                    type="current"
                    handleAddQuote={(data, id) => { let changes = this.state; changes.data[id] = data; changes.data[id].type = "unfinalize"; this.setState(changes); }}
                />
</div>

                {
                    Object.keys(this.state.data).map(quoteId =>
                      
<div className="col-lg-6 col-md-6">
                        <InteractiveList
                            headings={'Quote' + this.state.data[quoteId].quoteNo} 
                            className="cardsInteractiveList" see={true} 
                            quoteId={quoteId} 
                            data={this.state.data[quoteId]} 
                            handleUnFinalized={this.handleUnFinalized}
                            handleFinalized={this.handleFinalized} />
                                  </div>
           
            
                            )
      
      }
       </div> 
      </div>
           
                  
           

            
            
            </>
        );
    }
}