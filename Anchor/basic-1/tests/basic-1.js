const assert = require("assert");
const anchor = require("@project-serum/anchor");
const { SystemProgram } = anchor.web3;

describe("basic-1", () => {
  const provider = anchor.AnchorProvider.local();

  // Configure the client to use the local cluster.
  anchor.setProvider(provider);

  it("Creates and initializes an account in a single atomic transaction (simplified)", async () => {
    
    const program = anchor.workspace.Basic1;

    const myAccount = anchor.web3.Keypair.generate();
    await program.rpc.initialize(new anchor.BN(1234), {
      accounts: {
        myAccount: myAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [myAccount],
    });

    const account = await program.account.myAccount.fetch(myAccount.publicKey);

    assert.ok(account.data.eq(new anchor.BN(1234)));

    _myAccount = myAccount;
  });

  it("Updates a previously created account", async () => {
    const myAccount = _myAccount;

    const program = anchor.workspace.Basic1;

    await program.rpc.update(new anchor.BN(4321), {
      accounts: {
        myAccount: myAccount.publicKey,
      },
    });

    const account = await program.account.myAccount.fetch(myAccount.publicKey);

    assert.ok(account.data.eq(new anchor.BN(4321)));

  });
});
