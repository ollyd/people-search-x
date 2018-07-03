const functions = require('firebase-functions');
const admin = require('firebase-admin');
const algoliasearch = require('algoliasearch');
const algoliaConfig = require('./.config');

const ALGOLIA_APP_ID = algoliaConfig.algoliaAppID;
const ALGOLIA_ADMIN_KEY = algoliaConfig.algoliaAdminApiKey;
const ALGOLIA_INDEX_NAME = algoliaConfig.algoliaIndexName;

admin.initializeApp();

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);
const peopleDocument = functions.firestore.document('/people/{id}');

// Transfers all receords in Firestore to Algolia
exports.reindexFirestoreDataToAlgolia = functions.https.onRequest((req, res) => {
	const arr = [];
	admin.firestore().collection('people').get()
		.then((people) => {
			people.forEach((person) => {
				let user = person.data();
				user.objectID = person.id;
				arr.push(user);
			});

			const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);
			const index = client.initIndex(ALGOLIA_INDEX_NAME);

			index.saveObjects(arr, (err, content) => {
				if(content) {
					return res.status(200).send(content);
				} else {
					throw new Error(err);
				}
			});
		}, (reject) => {
			throw new Error(reject);
		})
		.catch((err) => console.log(err));
});

const algoliaSync = (record, action) => {
	if(action === 'delete') {
		return index.deleteObject(record)
			.then(() => {
				console.log(`Firebase object ${action} in Algolia:`, record);
			})
			.catch(error => {
				console.error(`Unable to ${action} person in Algolia:`, error);
				process.exit(1);
			});
	} else {
		return index.saveObject(record)
			.then(() => {
				console.log(`Firebase object ${action} in Algolia:`, record.objectID);
			})
			.catch(error => {
				console.error(`Unable to ${action} person in Algolia:`, error);
				process.exit(1);
			});
	}
}

exports.addIndexRecord = peopleDocument.onCreate((person, context) => {
	const record = person.data();
	record.objectID = context.params.id;
	return algoliaSync(record, 'create');
});

exports.updateIndexRecord = peopleDocument.onUpdate((person, context) => {
	var record = person.after.data();
	record.objectID = context.params.id;
	return algoliaSync(record, 'update');
});

exports.deleteIndexRecord = peopleDocument.onDelete((person, context) => {
	const objectID = context.params.id;
	return algoliaSync(objectID, 'delete');
});
