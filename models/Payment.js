module.exports = (sequalize, DataTypes) => {
    const Payment = sequalize.define('payment', {   
        _id: {
            type: DataTypes.INTEGER(11),
            autoIncrement: true,
            primaryKey: true

        },
        amount:{
                    type: DataTypes.DECIMAL(15,2),
            allowNull: false,
            
                    validate:{
                        notEmpty: true,
                                               
                    }
        },
        transaction:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true,

            }
        },
        balance:{
            type: DataTypes.DECIMAL(15,2),
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        date:{
            type: DataTypes.DATE,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        
        phone:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        
            
    })  
    return Payment;
}