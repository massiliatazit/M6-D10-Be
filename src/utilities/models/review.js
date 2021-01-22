module.exports = (sequelize, DataTypes) => {
    const review = sequelize.define(
      "review",
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        comment: {
          type: DataTypes.STRING(1000),
          allowNull: false,
        },
        rate: {
          type: DataTypes.INTEGER,
          allowNull: false,
          default: 3,
          validate: {
            min: 0,
            max: 5,
          },
        },
      },
      { timestamps: true }
    );
    review.associate = (models) => {
      review.belongsTo(models.product);
    };
    return review;
  };