describe("resetBoard", function() {
  it('resets the board once the game is over', function() {
    expect(gameBoard).toEqual(['','','','','','','','','']);
  });
});

describe("players", function() {
  it('player x has a name', function() {
    expect(playerX).toEqual({name: ''});
  });
  it('player y has a name', function() {
    expect(playerY).toEqual({name: ''});
  });
});
