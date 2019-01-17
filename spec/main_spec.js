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

describe("player score", function() {
  it('player 1 has no score at start of the game', function() {
    expect(scoreOne).toEqual(0)
  });
  it('player 2 has no score at start of the game', function() {
    expect(scoreTwo).toEqual(0)
  });
});
