import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, Text, View, StyleSheet, Pressable, type ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserSession } from '@/services/session';
import { colors, fonts, text } from '@/theme/theme';

function HowToItem({ icon, title, desc, style }: { icon: any; title: string; desc: string; style?: ViewStyle }) {
  return (
    <View style={[styles.howToItem, style]}>
      <View style={styles.iconCircle}>
        <Ionicons name={icon} size={24} color={colors.primary} />
      </View>
      <View style={{ flex: 1, marginLeft: 16 }}>
        <Text style={styles.howToTitle}>{title}</Text>
        <Text style={styles.howToDesc}>{desc}</Text>
      </View>
    </View>
  );
}

export default function RewardsScreen() {
  const router = useRouter();
  const { session } = useUserSession();

  const rewards = [
    { id: 1, name: 'Free Oil Filter', points: 500, icon: 'construct-outline' },
    { id: 2, name: '10% Discount on Service', points: 1000, icon: 'pricetag-outline' },
    { id: 3, name: 'Free Car Wash', points: 1500, icon: 'water-outline' },
    { id: 4, name: 'Free Tire Rotation', points: 2000, icon: 'sync-outline' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.black} />
        </Pressable>
        <Text style={text.headingSmall}>EJR Rewards</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <View style={styles.pointsHero}>
          <Text style={styles.heroLabel}>Total Balance</Text>
          <Text style={styles.heroValue}>{session.points}</Text>
          <Text style={styles.heroSubtext}>Points expire on Dec 31, 2024</Text>
        </View>

        <Text style={[text.headingSmall, { marginTop: 32, marginBottom: 16 }]}>How to earn points</Text>
        <View style={styles.howToCard}>
          <HowToItem
            icon="construct-outline"
            title="Completing a Service"
            desc="Earn points for every mechanical service completed."
          />
          <HowToItem
            icon="cart-outline"
            title="Purchasing Parts"
            desc="Earn 1 point for every ₱100 spent on parts."
            style={{ marginTop: 16 }}
          />
          <HowToItem
            icon="calendar-outline"
            title="Completing Appointments"
            desc="Earn 50 points for every successful visit."
            style={{ marginTop: 16 }}
          />
          <HowToItem
            icon="people-outline"
            title="Referring a New Customer"
            desc="Get 100 points when a friend books their first service."
            style={{ marginTop: 16 }}
          />
          <HowToItem
            icon="star-outline"
            title="Leaving a Service Review"
            desc="Earn 20 points for sharing your feedback."
            style={{ marginTop: 16 }}
          />
          <HowToItem
            icon="shield-checkmark-outline"
            title="Regular Maintenance"
            desc="Bonus points for keeping your vehicle healthy."
            style={{ marginTop: 16 }}
          />
          <HowToItem
            icon="gift-outline"
            title="Birthday Rewards"
            desc="A special point gift on your special day."
            style={{ marginTop: 16 }}
          />
          <HowToItem
            icon="megaphone-outline"
            title="Special EJR Promotions"
            desc="Earn extra points during EJR Garage events."
            style={{ marginTop: 16 }}
          />
        </View>

        <Text style={[text.headingSmall, { marginTop: 32, marginBottom: 16 }]}>Available Rewards</Text>
        <View style={{ gap: 12 }}>
          {rewards.map((r) => {
            const canAfford = session.points >= r.points;
            return (
              <View key={r.id} style={[styles.rewardCard, !canAfford && { opacity: 0.6 }]}>
                <View style={styles.rewardIcon}>
                  <Ionicons name={r.icon as any} size={24} color={colors.primary} />
                </View>
                <View style={{ flex: 1, marginLeft: 16 }}>
                  <Text style={styles.rewardName}>{r.name}</Text>
                  <Text style={styles.rewardPoints}>{r.points} points</Text>
                </View>
                <Pressable
                  style={[styles.redeemBtn, { backgroundColor: canAfford ? colors.primary : colors.greyBorder }]}
                  disabled={!canAfford}
                >
                  <Text style={[styles.redeemText, { color: canAfford ? colors.white : colors.greyText }]}>
                    {canAfford ? 'Redeem' : 'Locked'}
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pointsHero: {
    backgroundColor: colors.primary,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  heroLabel: {
    fontFamily: fonts.medium,
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  heroValue: {
    fontFamily: fonts.bold,
    fontSize: 60,
    color: colors.white,
  },
  heroSubtext: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 8,
  },
  howToCard: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: colors.greyLight,
  },
  howToItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  howToTitle: {
    fontFamily: fonts.semibold,
    fontSize: 15,
  },
  howToDesc: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.greyText,
    marginTop: 2,
  },
  rewardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.greyBorder,
  },
  rewardIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rewardName: {
    fontFamily: fonts.semibold,
    fontSize: 15,
  },
  rewardPoints: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.primary,
    marginTop: 2,
  },
  redeemBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  redeemText: {
    fontFamily: fonts.semibold,
    fontSize: 12,
  },
});
